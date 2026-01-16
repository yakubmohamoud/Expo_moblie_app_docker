# Architecture & Flow Diagrams

## 1. App Navigation Flow

```
┌─────────────────────────────────────────────────────┐
│              Root Layout (_layout.tsx)               │
│         Redux Provider + Theme Provider              │
└────────────────┬──────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
    ┌───▼────┐    ┌──────▼──────┐
    │ Auth   │    │ Authenticated│
    │ Stack  │    │    Tabs      │
    └────┬───┘    └──────┬───────┘
         │               │
    ┌────┴─┴────┐        │
    │            │        │
┌───▼──┐    ┌───▼──┐     ├─ Home (index.tsx)
│Login │    │Signup│     ├─ Explore (explore.tsx)
│      │    │      │     └─ Modal
└──────┘    └──────┘

Role-Based Navigation (After Auth):
├─ Client  → ClientDashboard
├─ Tailor  → TailorDashboard
└─ Admin   → AdminDashboard
```

---

## 2. User Authentication Flow

```
┌──────────────────┐
│  User Opens App  │
└────────┬─────────┘
         │
         ▼
   ┌─────────────┐
   │Redux Store: │
   │Check if user│
   │ authenticated
   └──────┬──────┘
          │
    ┌─────┴──────┐
    │             │
YES │             │ NO
    ▼             ▼
┌────────┐   ┌──────────────────┐
│ Tabs   │   │ Auth Stack       │
│Layout  │   │                  │
└────────┘   ├─ LoginScreen     │
             │   ├─ Email input │
             │   ├─ Password    │
             │   └─ Submit      │
             │                  │
             ├─ SignupScreen    │
             │   ├─ Name input  │
             │   ├─ Email input │
             │   ├─ Password    │
             │   ├─ Role select │
             │   └─ Submit      │
             └──────┬───────────┘
                    │
            ┌───────▼────────┐
            │ Firebase Auth  │
            │ createUser() or│
            │ signIn()       │
            └────────┬───────┘
                     │
         ┌───────────┴──────────┐
         │                      │
      Success              Fail/Error
         │                      │
         ▼                      ▼
    ┌────────┐         ┌───────────┐
    │Update  │         │Show Error │
    │Redux   │         │Message    │
    │State   │         └───────────┘
    └────┬───┘
         │
         ▼
    ┌────────┐
    │Save to │
    │Redux & │
    │Persist │
    └────────┘
```

---

## 3. Data Flow Architecture

```
                    React Components
                         │
                         ▼
        ┌────────────────────────────────┐
        │   Component Props/State        │
        │  (Local State Management)      │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │    Redux Store             │
        │  (Global State)            │
        │  - Auth (user, loading)    │
        │  - (Jobs, Quotes, etc)     │
        └────────────┬────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
   ┌─────────┐          ┌──────────────┐
   │Services │          │React Hooks   │
   │(Modules)│          │useAppDispatch│
   └────┬────┘          │useAppSelector│
        │               └──────────────┘
    ┌───┴────────────┬──────────┬─────────┐
    │                │          │         │
┌───▼──────┐    ┌───▼────┐ ┌──▼────┐ ┌─▼────┐
│Firebase  │    │Stripe  │ │Uber   │ │Axios │
│Auth/DB   │    │API     │ │API    │ │HTTP  │
└──────────┘    └────────┘ └───────┘ └──────┘
```

---

## 4. Redux State Structure

```
Store {
  auth: {
    user: {
      uid: string
      email: string
      displayName: string
      role: 'client' | 'tailor' | 'admin'
      createdAt: Date
      updatedAt: Date
    }
    loading: boolean
    error: string | null
    isAuthenticated: boolean
  }
}
```

---

## 5. API Request/Response Flow

```
UI Component
    │
    ▼
┌─────────────────────────┐
│Redux Action Dispatch    │
│(setLoading = true)      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│Service Module Call      │
│(jobAPI.createJob())     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│Axios HTTP Request       │
│POST /api/jobs           │
│+ Auth Token             │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│Backend Express Server   │
│Validate, Process, DB    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│HTTP Response            │
│200 OK / 4xx / 5xx       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│Axios Interceptor        │
│Error Handling           │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│Redux Reducer            │
│Update state with data   │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│UI Re-renders            │
│Shows new data           │
└─────────────────────────┘
```

---

## 6. Feature Module Structure

```
features/auth/
├── LoginScreen.tsx       (UI Component)
├── SignupScreen.tsx      (UI Component)
├── authSlice.ts          (Redux reducer)
├── hooks.ts              (Custom hooks + Firebase calls)
└── types.ts              (TypeScript interfaces - optional)

Example Pattern:
Component → Hook → Redux Dispatch → Service Call → API → Redux Update → Re-render
```

---

## 7. Complete User Journey

```
1. APP LAUNCH
   └─ Check Redux auth state
      ├─ If logged in → Show Tabs
      └─ If not → Show Auth Stack

2. SIGNUP
   ├─ User enters: name, email, password, role
   ├─ Client validates input (email format, password strength)
   ├─ Send to Firebase: createUserWithEmailAndPassword()
   ├─ Create Firestore doc in /users/{uid}
   ├─ Store user in Redux
   └─ Navigate to tabs/dashboard

3. LOGIN
   ├─ User enters: email, password
   ├─ Send to Firebase: signInWithEmailAndPassword()
   ├─ Fetch user doc from Firestore
   ├─ Store in Redux
   └─ Navigate to appropriate dashboard

4. USE APP
   ├─ Client:
   │  ├─ Submit job (form → API → Firestore)
   │  ├─ Browse quotes
   │  ├─ Accept quote
   │  └─ Make payment
   │
   ├─ Tailor:
   │  ├─ Browse available jobs
   │  ├─ Submit quote
   │  └─ View accepted quotes
   │
   └─ Admin:
      ├─ View all jobs/quotes/payments
      ├─ Manage users
      └─ Resolve disputes

5. LOGOUT
   └─ Clear Redux state → Show Auth Stack

6. SESSION PERSISTENCE
   └─ Firebase SDK automatically maintains session
      └─ On app restart: Load user from Firebase → Update Redux
```

---

## 8. Phase Progression

```
        PHASE 1         PHASE 2         PHASE 3         PHASE 4
        (DONE)          (NEXT)          (TODO)          (TODO)
        
    Infrastructure   Authentication    UI Screens      Backend API
    ─────────────    ───────────────   ──────────      ────────────
    
    Redux Store ──┐
    Firebase SDK │   Firebase Auth    Client Forms    Job Endpoints
    API Client   │   Firestore Setup  Tailor Portal   Quote Endpoints
    Auth UI ─────┘   Session Mgmt     Payment Form    Payment Webhooks
                     Role Guards      Delivery UI     User APIs

        │                 │                 │            │
        └─────────────────┴─────────────────┴────────────┘
                    Continuous Integration
                    Code Reviews
                    Testing
                    Documentation
        
        PHASE 5              PHASE 6
        (TODO)               (TODO)
        
    Payments/Delivery    Deployment
    ──────────────────   ──────────
    
    Stripe Checkout      Build APK/IPA
    Stripe Connect       Deploy Backend
    Stripe Webhooks      Set up HTTPS
    Uber Integration     Environment Config
    Delivery Tracking    Production Testing
    
    │
    └──► MVP COMPLETE & LIVE ✅
```

---

## 9. API Endpoint Structure

```
Backend Server (Express.js)
│
├─ /health (GET)
│  └─ Check server is running
│
├─ /api/auth/
│  ├─ POST signup
│  └─ POST login
│
├─ /api/jobs/
│  ├─ GET /          (list all)
│  ├─ POST /         (create)
│  ├─ GET /:id       (detail)
│  ├─ PUT /:id       (update)
│  └─ DELETE /:id    (delete)
│
├─ /api/quotes/
│  ├─ POST /
│  ├─ GET /jobs/:jobId/quotes
│  ├─ GET /tailors/:tailorId/quotes
│  ├─ PUT /:id
│  ├─ POST /:id/accept
│  └─ POST /:id/reject
│
├─ /api/payments/
│  ├─ POST /intent
│  ├─ POST /:id/confirm
│  └─ GET /:id
│
├─ /api/delivery/
│  ├─ POST /estimate
│  └─ POST /
│
└─ /api/users/
   ├─ GET /:id
   ├─ PUT /:id
   └─ GET /search
```

---

## 10. Database Schema (Firestore Collections)

```
firestore
├─ users/ {uid}
│  ├─ uid: string
│  ├─ email: string
│  ├─ displayName: string
│  ├─ role: enum (client, tailor, admin)
│  ├─ createdAt: timestamp
│  └─ updatedAt: timestamp
│
├─ jobs/ {jobId}
│  ├─ id: string
│  ├─ clientId: string
│  ├─ description: string
│  ├─ images: string[]
│  ├─ status: enum
│  ├─ budget: number
│  ├─ deadline: timestamp
│  ├─ createdAt: timestamp
│  └─ updatedAt: timestamp
│
├─ quotes/ {quoteId}
│  ├─ id: string
│  ├─ jobId: string
│  ├─ tailorId: string
│  ├─ amount: number
│  ├─ estimatedDays: number
│  ├─ description: string
│  ├─ status: enum
│  ├─ createdAt: timestamp
│  └─ updatedAt: timestamp
│
├─ payments/ {paymentId}
│  ├─ id: string
│  ├─ jobId: string
│  ├─ clientId: string
│  ├─ tailorId: string
│  ├─ amount: number
│  ├─ stripePaymentIntentId: string
│  ├─ status: enum
│  ├─ createdAt: timestamp
│  └─ updatedAt: timestamp
│
└─ deliveries/ {deliveryId}
   ├─ id: string
   ├─ paymentId: string
   ├─ pickupAddress: string
   ├─ dropoffAddress: string
   ├─ estimatedCost: number
   ├─ estimatedDuration: number
   ├─ status: enum
   ├─ uberRequestId: string
   ├─ createdAt: timestamp
   └─ updatedAt: timestamp
```

---

## Legend

```
┌────┐
│Box │  = Component/Service/Module
└────┘

  ▼   = Data flow down
  ─   = Data flow right
  ┴   = Connection point

✅ = Complete
🔄 = In Progress  
⏳ = To Do
🔐 = Requires Authentication
```

---

**Created**: January 15, 2026  
**Version**: 1.0  
**Status**: Reference Material for Phase 1-6 Implementation
