export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'client' | 'tailor' | 'admin';
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TailoringJob {
  id: string;
  clientId: string;
  description: string;
  images: string[];
  status: 'open' | 'quoted' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  budget?: number;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quote {
  id: string;
  jobId: string;
  tailorId: string;
  amount: number;
  estimatedDays: number;
  description: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  jobId: string;
  clientId: string;
  tailorId: string;
  amount: number;
  stripePaymentIntentId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

export interface Delivery {
  id: string;
  paymentId: string;
  pickupAddress: string;
  dropoffAddress: string;
  estimatedCost: number;
  estimatedDuration: number;
  status: 'estimated' | 'booked' | 'in-transit' | 'delivered';
  uberRequestId?: string;
  createdAt: Date;
  updatedAt: Date;
}
