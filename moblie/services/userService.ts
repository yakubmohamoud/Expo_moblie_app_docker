import { apiClient } from './api';
import type { User } from '../types';

export const userAPI = {
  // Get user profile
  getProfile: (userId: string) =>
    apiClient.get(`/users/${userId}`),

  // Update profile
  updateProfile: (userId: string, updates: Partial<User>) =>
    apiClient.put(`/users/${userId}`, updates),

  // Search users (for finding tailors)
  searchUsers: (query: string, role?: string) =>
    apiClient.get('/users/search', { params: { q: query, role } }),

  // Get tailor details with reviews
  getTailorProfile: (tailorId: string) =>
    apiClient.get(`/tailors/${tailorId}`),

  // Get tailor reviews
  getTailorReviews: (tailorId: string) =>
    apiClient.get(`/tailors/${tailorId}/reviews`),
};
