# Backend API Server

Node.js/Express backend for the Tailoring App.

## Setup

1. Copy `.env.example` to `.env`
2. Fill in Firebase and Stripe credentials
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`

## API Endpoints

### Auth
- `POST /api/auth/signup` - Create user account
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create job
- `GET /api/jobs/:jobId` - Get job details
- `PUT /api/jobs/:jobId` - Update job
- `DELETE /api/jobs/:jobId` - Delete job

### Quotes
- `POST /api/quotes` - Create quote
- `GET /api/jobs/:jobId/quotes` - Get job quotes
- `GET /api/tailors/:tailorId/quotes` - Get tailor quotes
- `PUT /api/quotes/:quoteId` - Update quote
- `POST /api/quotes/:quoteId/accept` - Accept quote
- `POST /api/quotes/:quoteId/reject` - Reject quote

### Payments
- `POST /api/payments/intent` - Create payment intent
- `POST /api/payments/:paymentId/confirm` - Confirm payment
- `GET /api/payments/:paymentId` - Get payment status

### Delivery
- `POST /api/delivery/estimate` - Get Uber delivery estimate

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update profile
- `GET /api/tailors/:tailorId` - Get tailor profile with reviews

## Deployment

Deploy to AWS London, Azure UK South, or DigitalOcean London with Docker:

```bash
docker build -t tailoring-backend .
docker run -p 3000:3000 --env-file .env tailoring-backend
```

## Tech Stack

- Express.js - Web framework
- Firebase Admin SDK - Database and auth
- Stripe API - Payments
- TypeScript - Type safety
