import express from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';

const app = express();
app.use(cors());
app.use(express.json());
const port = Number(process.env.PORT ?? 4000);
type EventMessage = { eventId: string; eventType: string; occurredAt: string; aggregateId: string; correlationId?: string; version: number; payload: unknown };
const subscribers = new Map<string, string[]>();
const history: EventMessage[] = [];

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'message-broker' }));
app.get('/events', (_req, res) => res.json(history));
app.post('/subscriptions', (req, res) => {
  const { eventType = '*', callbackUrl } = req.body ?? {};
  if (!callbackUrl) return res.status(400).json({ message: 'callbackUrl é obrigatório.' });
  const urls = subscribers.get(eventType) ?? [];
  if (!urls.includes(callbackUrl)) urls.push(callbackUrl);
  subscribers.set(eventType, urls);
  return res.status(201).json({ eventType, callbackUrl });
});
app.post('/events', async (req, res) => {
  const input = req.body ?? {};
  if (!input.eventType || !input.aggregateId || input.payload === undefined) return res.status(400).json({ message: 'eventType, aggregateId e payload são obrigatórios.' });
  const event: EventMessage = { eventId: input.eventId ?? randomUUID(), eventType: input.eventType, occurredAt: input.occurredAt ?? new Date().toISOString(), aggregateId: String(input.aggregateId), correlationId: input.correlationId, version: input.version ?? 1, payload: input.payload };
  history.push(event);
  const targets = [...(subscribers.get('*') ?? []), ...(subscribers.get(event.eventType) ?? [])];
  const deliveries = await Promise.allSettled(targets.map(async (url) => {
    const response = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(event) });
    if (!response.ok) throw new Error(`${url}: ${response.status}`);
  }));
  const failed = deliveries.filter((d) => d.status === 'rejected').length;
  return res.status(202).json({ event, delivered: targets.length - failed, failed });
});
app.listen(port, () => console.log(`message-broker executando em http://localhost:${port}`));
