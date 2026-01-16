# Quick Start Guide

## For Interns: Getting Started with Tailoring App

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Expo Go app on your phone (free from App Store/Google Play)
- Firebase account (free tier is fine)
- Stripe account (free developer account)

---

## 1. Clone & Setup (5 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd Expo_moblie_app_docker

# Install mobile app dependencies
cd moblie
npm install

# Go back to root
cd ..
```

---

## 2. Firebase Setup (15 minutes)

1. **Create Firebase project**:
   - Go to https://console.firebase.google.com
   - Click "Create a new project"
   - Name it `tailoring-app`
   - Disable Google Analytics
   - Click "Create project"

2. **Get credentials**:
   - Click the Settings gear icon (bottom left)
   - Go to "Project settings"
   - Under "Your apps", click "Web"
   - Copy the config object (everything in curly braces)

3. **Add to .env**:
   ```bash
   cd moblie
   cp .env.example .env
   # Edit .env with your Firebase credentials
   nano .env  # or use VS Code
   ```

   Example:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyDxxxx...
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tailoring-app-xxxx.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=tailoring-app-xxxx
   # ... etc
   ```

4. **Create Firestore database**:
   - In Firebase Console, go to "Firestore Database"
   - Click "Create database"
   - Select "Start in production mode"
   - Select region "europe-west2" (London)
   - Click "Create"

5. **Set Firestore security rules**:
   - Go to "Firestore Database" → "Rules"
   - Replace with rules from `FIREBASE_SETUP.md`
   - Publish rules

---

## 3. Run the App (3 minutes)

```bash
# In moblie/ directory
npm start

# You'll see a QR code in terminal
# Scan with Expo Go app on your phone
```

The app will open in Expo Go!

---

## 4. Understanding the Codebase (30 minutes)

Read these files in order:
1. `PHASE_1_SUMMARY.md` - What's been built
2. `IMPLEMENTATION_ROADMAP.md` - Full 6-phase plan
3. `moblie/types/index.ts` - Data structures
4. `moblie/features/auth/LoginScreen.tsx` - Example component

---

## 5. Phase 2: Firebase Auth (Your First Task)

### Goal
Make login/signup actually work with Firebase.

### Files to Modify
- `moblie/features/auth/hooks.ts` - Add Firebase sign-up and login functions
- `moblie/features/auth/LoginScreen.tsx` - Call Firebase methods
- `moblie/features/auth/SignupScreen.tsx` - Create Firestore user doc

### Steps

1. **In `features/auth/hooks.ts`, add Firebase methods**:

```typescript
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../../services/firebase';

export const useAuth = () => {
  // ... existing code

  const signup = async (email: string, password: string, displayName: string, role: 'client' | 'tailor') => {
    dispatch(setLoading(true));
    try {
      // Create auth user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create Firestore user doc
      await setDoc(doc(firestore, 'users', result.user.uid), {
        uid: result.user.uid,
        email,
        displayName,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Update Redux
      dispatch(setUser({
        uid: result.user.uid,
        email,
        displayName,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Signup failed';
      dispatch(setError(msg));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Fetch user doc from Firestore and dispatch to Redux
      const userDoc = await getDoc(doc(firestore, 'users', result.user.uid));
      const userData = userDoc.data();
      
      dispatch(setUser(userData as User));
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Login failed';
      dispatch(setError(msg));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { user, loading, error, isAuthenticated, logout, signup, login };
};
```

2. **In LoginScreen.tsx**, replace the placeholder with Firebase call:

```typescript
const handleLogin = useCallback(async () => {
  try {
    await login(email, password);
    router.replace('/(tabs)');
  } catch (error) {
    Alert.alert('Login failed', error instanceof Error ? error.message : 'Unknown error');
  }
}, [email, password, login, router]);
```

3. **Test on your phone** with Expo Go!

---

## 6. Git Workflow

```bash
# Create feature branch
git checkout -b feature/firebase-auth

# Make changes
# Test thoroughly

# Commit
git add .
git commit -m "feat: implement Firebase authentication"

# Push
git push origin feature/firebase-auth

# Create pull request on GitHub
```

---

## 7. Debugging Tips

### Check console logs
```bash
# Terminal shows app logs in real-time
# Look for Firebase errors
```

### Check Firestore
```
Firebase Console → Firestore Database → Data
# View created documents in real-time
```

### Network issues?
- Check `.env` variables are loaded: `console.log(process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID)`
- Ensure device/emulator has internet
- Try restarting Expo: `npm start` then "r" key

### Still stuck?
- Check error message in terminal
- Search error in Firebase docs: https://firebase.google.com/docs
- Ask team lead in standup

---

## 8. Daily Workflow

```bash
# Each morning
git pull origin main

# Work on feature
# Test frequently with Expo Go

# Before committing
npm run lint  # Check code style

# Push changes
git add .
git commit -m "descriptive message"
git push origin feature/your-feature
```

---

## 9. Available Commands

```bash
# Frontend
cd moblie
npm start        # Start dev server
npm run android  # Build for Android
npm run ios      # Build for iOS
npm run web      # Run on web
npm run lint     # Check code style

# Backend (Phase 4)
cd backend
npm run dev      # Start dev server
npm run build    # Build TypeScript
npm start        # Run built version
```

---

## 10. Resources

- **Firebase Docs**: https://firebase.google.com/docs
- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **Redux Docs**: https://redux.js.org
- **Stripe Docs**: https://stripe.com/docs

---

## 11. Important: Never Commit

- ❌ `.env` file (contains secrets)
- ❌ `node_modules/`
- ❌ `.DS_Store` (macOS)
- ❌ `dist/` or `build/` folders

These should be in `.gitignore` ✅

---

## 12. Team Communication

- **Daily standup**: 15 min, share progress/blockers
- **Code reviews**: 2+ approvals before merge
- **Questions**: Ask in team chat immediately
- **Blockers**: Escalate to team lead

---

## Ready to Start?

1. ✅ Set up Firebase (15 min)
2. ✅ Run `npm install` (3 min)
3. ✅ Start dev server: `npm start` (2 min)
4. 🔄 Implement Phase 2: Firebase Auth (3-4 days)
5. 📤 Push to GitHub and create PR

**Questions? Ask the team lead!**

---

**Created**: January 15, 2026  
**For**: Tailoring App Interns  
**Status**: Ready for Phase 2 ✅
