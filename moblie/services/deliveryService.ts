import { apiClient } from './api';
import type { Delivery } from '../types';

export const deliveryAPI = {
  // Get delivery estimate from Uber
  getDeliveryEstimate: (pickupAddress: string, dropoffAddress: string) =>
    apiClient.post('/delivery/estimate', { pickupAddress, dropoffAddress }),

  // Create delivery request
  createDelivery: (deliveryData: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiClient.post('/deliveries', deliveryData),

  // Get delivery status
  getDeliveryStatus: (deliveryId: string) =>
    apiClient.get(`/deliveries/${deliveryId}`),

  // Track delivery
  trackDelivery: (deliveryId: string) =>
    apiClient.get(`/deliveries/${deliveryId}/track`),

  // Cancel delivery
  cancelDelivery: (deliveryId: string) =>
    apiClient.post(`/deliveries/${deliveryId}/cancel`),
};
