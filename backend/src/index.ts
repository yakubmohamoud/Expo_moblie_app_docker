import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Auth routes (Phase 2)
app.post('/api/auth/signup', (req: Request, res: Response) => {
  res.status(501).json({ error: 'Auth routes not yet implemented' });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  res.status(501).json({ error: 'Auth routes not yet implemented' });
});

// Job routes
app.post('/api/jobs', (req: Request, res: Response) => {
  res.status(501).json({ error: 'Job routes not yet implemented' });
});

app.get('/api/jobs', (req: Request, res: Response) => {
  res.status(501).json({ error: 'Job routes not yet implemented' });
});

app.get('/api/jobs/:jobId', (req: Request, res: Response) => {
  res.status(501).json({ error: 'Job routes not yet implemented' });
});

// Quote routes
app.post('/api/quotes', (req: Request, res: Response) => {
  res.status(501).json({ error: 'Quote routes not yet implemented' });
});

app.get('/api/jobs/:jobId/quotes', (req: Request, res: Response) => {
  res.status(501).json({ error: 'Quote routes not yet implemented' });
});

// Payment routes
app.post('/api/payments/intent', (req: Request, res: Response) => {
  res.status(501).json({ error: 'Payment routes not yet implemented' });
});

app.post('/api/payments/:paymentId/confirm', (req: Request, res: Response) => {
  res.status(501).json({ error: 'Payment routes not yet implemented' });
});

// Delivery routes
app.post('/api/delivery/estimate', (req: Request, res: Response) => {
  res.status(501).json({ error: 'Delivery routes not yet implemented' });
});

// User routes
app.get('/api/users/:userId', (req: Request, res: Response) => {
  res.status(501).json({ error: 'User routes not yet implemented' });
});

// Error handler
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API base URL: http://localhost:${PORT}/api`);
});
