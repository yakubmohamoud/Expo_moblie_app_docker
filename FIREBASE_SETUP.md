# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project"
3. Enter project name: `tailoring-app`
4. Disable Google Analytics (optional) or enable it
5. Create project

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Enable **Email/Password** sign-in method
4. Save

## Step 3: Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Select **Production mode** (or Start in test mode for development)
4. Select region: **europe-west2** (London)
5. Create database

## Step 4: Get Credentials

1. Go to **Project settings** (gear icon)
2. Go to **Service accounts** tab
3. Select **JavaScript** and copy the config object:

```javascript
{
  apiKey: "AIzaSy...",
  authDomain: "tailoring-app-xxx.firebaseapp.com",
  projectId: "tailoring-app-xxx",
  storageBucket: "tailoring-app-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
}
```

## Step 5: Add to .env

Create file `moblie/.env` (copy from `.env.example`) and add:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tailoring-app-xxx.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tailoring-app-xxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tailoring-app-xxx.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

## Step 6: Create Firestore Collections

Create these collections in Firestore:

### users
```
{
  uid: string (document ID)
  email: string
  displayName: string
  role: "client" | "tailor" | "admin"
  photoURL: string (optional)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### jobs
```
{
  id: string (document ID)
  clientId: string
  description: string
  images: string[] (URLs)
  status: "open" | "quoted" | "accepted" | "in-progress" | "completed" | "cancelled"
  budget: number (optional)
  deadline: timestamp (optional)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### quotes
```
{
  id: string (document ID)
  jobId: string
  tailorId: string
  amount: number
  estimatedDays: number
  description: string
  status: "pending" | "accepted" | "rejected"
  createdAt: timestamp
  updatedAt: timestamp
}
```

### payments
```
{
  id: string (document ID)
  jobId: string
  clientId: string
  tailorId: string
  amount: number
  stripePaymentIntentId: string
  status: "pending" | "completed" | "failed" | "refunded"
  createdAt: timestamp
  updatedAt: timestamp
}
```

### deliveries
```
{
  id: string (document ID)
  paymentId: string
  pickupAddress: string
  dropoffAddress: string
  estimatedCost: number
  estimatedDuration: number (seconds)
  status: "estimated" | "booked" | "in-transit" | "delivered"
  uberRequestId: string (optional)
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Step 7: Set Firestore Security Rules

Go to **Firestore Database → Rules** and add:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Allow all authenticated users to read jobs
    match /jobs/{jobId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.clientId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.clientId == request.auth.uid;
    }
    
    // Allow all authenticated users to read quotes
    match /quotes/{quoteId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.tailorId == request.auth.uid;
      allow update: if request.auth != null && (resource.data.tailorId == request.auth.uid || resource.data.jobId in firestore.get(/databases/$(database)/documents/jobs/$(resource.data.jobId)).data.clientId);
    }
    
    // Restrict payments to authenticated users
    match /payments/{paymentId} {
      allow read: if request.auth != null && (resource.data.clientId == request.auth.uid || resource.data.tailorId == request.auth.uid);
      allow create: if request.auth != null && request.resource.data.clientId == request.auth.uid;
    }
    
    // Restrict deliveries
    match /deliveries/{deliveryId} {
      allow read, update: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

## Step 8: Install Dependencies

In the `moblie` directory:

```bash
npm install
```

## Step 9: Test Firebase Connection

In Phase 2, we'll test the Firebase connection with the login/signup screens.

---

For questions, refer to:
- [Firebase JS SDK Docs](https://firebase.google.com/docs/web/setup)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
