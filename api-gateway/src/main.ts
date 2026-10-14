import express from 'express';
import cors from 'cors';
import http from 'node:http';

const app = express();
app.use(cors());
app.use(express.json());
const port = Number(process.env.PORT ?? 3000);
const targets: Record<string, string> = {
  gestao: process.env.GESTAO_URL ?? 'http://localhost:3001',
  faturamento: process.env.FATURAMENTO_URL ?? 'http://localhost:4001',
  'planos-ativos': process.env.PLANOS_ATIVOS_URL ?? 'http://localhost:4002'
};
function proxy(prefix: string, target: string) {
  app.use(`/${prefix}`, (req, res) => {
    const url = new URL(req.originalUrl, target);
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body ?? {});
    const request = http.request(url, { method: req.method, headers: { ...req.headers, host: url.host, ...(body ? { 'content-length': Buffer.byteLength(body) } : {}) } }, (response) => {
      res.status(response.statusCode ?? 502);
      Object.entries(response.headers).forEach(([key, value]) => { if (value !== undefined) res.setHeader(key, value as string | string[]); });
      response.pipe(res);
    });
    request.on('error', () => res.status(502).json({ message: `Serviço ${prefix} indisponível.` }));
    if (body) request.write(body);
    request.end();
  });
}
app.get('/health', async (_req, res) => {
  const checks = await Promise.all(Object.entries(targets).map(async ([service, base]) => { try { const r = await fetch(`${base}/health`); return [service, r.ok]; } catch { return [service, false]; } }));
  const services = Object.fromEntries(checks); const healthy = Object.values(services).every(Boolean);
  return res.status(healthy ? 200 : 503).json({ status: healthy ? 'ok' : 'degraded', gateway: 'ok', services });
});
proxy('gestao', targets.gestao); proxy('faturamento', targets.faturamento); proxy('planos-ativos', targets['planos-ativos']);
app.listen(port, () => console.log(`api-gateway executando em http://localhost:${port}`));
