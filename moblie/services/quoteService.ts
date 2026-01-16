import { apiClient } from './api';
import type { Quote } from '../types';

export const quoteAPI = {
  // Create a quote
  createQuote: (quoteData: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiClient.post('/quotes', quoteData),

  // Get quotes for a job
  getJobQuotes: (jobId: string) =>
    apiClient.get(`/jobs/${jobId}/quotes`),

  // Get quotes from a tailor
  getTailorQuotes: (tailorId: string) =>
    apiClient.get(`/tailors/${tailorId}/quotes`),

  // Update quote
  updateQuote: (quoteId: string, updates: Partial<Quote>) =>
    apiClient.put(`/quotes/${quoteId}`, updates),

  // Accept quote
  acceptQuote: (quoteId: string) =>
    apiClient.post(`/quotes/${quoteId}/accept`),

  // Reject quote
  rejectQuote: (quoteId: string) =>
    apiClient.post(`/quotes/${quoteId}/reject`),
};
