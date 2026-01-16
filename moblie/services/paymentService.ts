import { apiClient } from './api';
import type { Payment } from '../types';

export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: (jobId: string, amount: number, tailorId: string) =>
    apiClient.post('/payments/intent', { jobId, amount, tailorId }),

  // Confirm payment
  confirmPayment: (paymentIntentId: string) =>
    apiClient.post(`/payments/${paymentIntentId}/confirm`),

  // Get payment status
  getPaymentStatus: (paymentId: string) =>
    apiClient.get(`/payments/${paymentId}`),

  // Get payments for user
  getUserPayments: (userId: string) =>
    apiClient.get(`/users/${userId}/payments`),

  // Refund payment
  refundPayment: (paymentId: string, reason: string) =>
    apiClient.post(`/payments/${paymentId}/refund`, { reason }),
};
