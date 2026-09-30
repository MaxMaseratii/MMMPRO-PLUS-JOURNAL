# MMM Pro Trading Journal

Max Maserati Model - Professional trading journal application with advanced analytics, strategy management, and performance tracking for futures traders.

**Frontend-only architecture** - Deployed on GitHub Pages with Firebase backend (Auth, Firestore, Storage).

## Application Structure

### Frontend (client/)
- **client/src/** - React TypeScript application
  - components/ - Reusable UI components organized by feature
    - analytics/ - Analytics components
    - checkout/ - Payment/checkout components
    - dashboard/ - Dashboard components
    - layout/ - Layout components
    - notifications/ - Notification components
    - onboarding/ - Onboarding flow components
    - sections/ - Page sections
    - ui/ - Base UI components (Radix UI)
  - pages/ - Application pages and routes
  - lib/ - Client utilities and Firebase integration
  - hooks/ - React custom hooks
  - assets/ - Images and static assets

## Features

- Professional trading journal for futures traders (ES/NQ focused)
- Advanced dashboard with real-time performance metrics
- Strategy management and tracking
- Daily planning with pre-market and post-market analysis
- Achievement and gamification system
- Risk management tools
- Forum/community features
- Subscription/billing system
- Market notifications and alerts
- Multi-user support with admin capabilities

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Firebase (Authentication, Firestore, Cloud Storage)
- **Deployment**: GitHub Pages (static hosting)
- **Build Tools**: Vite
- **Auth**: Firebase Authentication
- **Database**: Firestore (NoSQL)
- **File Storage**: Firebase Cloud Storage
- **Charts**: Recharts
- **UI Framework**: Radix UI components
- **Tours/Guides**: React Joyride

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Configuration

- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `postcss.config.js` - PostCSS plugins
- `.env.example` - Firebase environment variables template

## Firebase Setup

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it "MMM Pro Trading Journal"
4. Enable Google Analytics (optional)

### 2. Configure Firebase Services
**Authentication:**
- Go to Authentication > Sign-in method
- Enable Email/Password
- Enable Google OAuth
- Add authorized redirect URIs

**Firestore Database:**
- Go to Firestore Database
- Create database in production mode
- Set security rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /trades/{uid}/{document=**} {
      allow read, write: if request.auth.uid == uid;
    }
    match /accounts/{uid}/{document=**} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

**Cloud Storage:**
- Go to Cloud Storage
- Create storage bucket
- Set security rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{uid}/{allPaths=**} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

### 3. Get Firebase Config
1. Go to Project Settings (gear icon)
2. Copy your web app config
3. Create `.env.local` in root directory
4. Add Firebase variables (see .env.example)

## Environment Setup

Create `.env.local` file (based on `.env.example`):
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Deployment to GitHub Pages

### Automatic Deployment
Push to `main` branch - GitHub Actions automatically builds and deploys to GitHub Pages.

### Manual Deployment
```bash
npm run build
npm run preview
```

### Enable GitHub Pages
1. Go to repo Settings > Pages
2. Set source to "Deploy from a branch"
3. Select `gh-pages` branch
4. Your app will be live at: `https://maxmaseratii.github.io/MMMPRO-PLUS-JOURNAL/`

## License

MIT
