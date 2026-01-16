import { apiClient } from './api';
import type { TailoringJob } from '../types';

export const jobAPI = {
  // Create a new job
  createJob: (jobData: Omit<TailoringJob, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiClient.post('/jobs', jobData),

  // Get all jobs
  getJobs: (filters?: { status?: string; clientId?: string }) =>
    apiClient.get('/jobs', { params: filters }),

  // Get job by ID
  getJobById: (jobId: string) =>
    apiClient.get(`/jobs/${jobId}`),

  // Update job
  updateJob: (jobId: string, updates: Partial<TailoringJob>) =>
    apiClient.put(`/jobs/${jobId}`, updates),

  // Delete job
  deleteJob: (jobId: string) =>
    apiClient.delete(`/jobs/${jobId}`),

  // Get jobs for a client
  getClientJobs: (clientId: string) =>
    apiClient.get(`/clients/${clientId}/jobs`),
};
