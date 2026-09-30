# MMM Pro Trading Journal

Max Maserati Model - Professional trading journal application with advanced analytics, strategy management, and performance tracking for futures traders.

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
  - lib/ - Client utilities and helpers
  - hooks/ - React custom hooks
  - assets/ - Images and static assets

### Backend (server/)
- **server/** - Express.js server with TypeScript
  - index.ts - Server entry point
  - routes.ts - API route handlers
  - db.ts - Database setup
  - auth.ts - Authentication logic
  - storage.ts - Data persistence
  - vite.ts - Development server

### Database Schema (shared/)
- **shared/schema.ts** - Drizzle ORM table definitions

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
- **Backend**: Express.js, TypeScript, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tools**: Vite, esbuild
- **Authentication**: Passport.js
- **Payments**: Stripe
- **Image Optimization**: Sharp, vite-plugin-image-optimizer
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

## Production

```bash
npm run start
```

## Configuration

- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `postcss.config.js` - PostCSS plugins
- `drizzle.config.ts` - Database migrations

## Database

PostgreSQL database with Drizzle ORM for type-safe queries.

```bash
npm run db:push
```

## Environment Setup

Create `.env` file with:
- DATABASE_URL
- OAuth credentials (GitHub, Google)
- Stripe API keys
- API endpoints and configuration

## Notes

This application was extracted from Replit and prepared for GitHub hosting. See EXTRACTION_MANIFEST.md for detailed file listing.

## License

MIT
