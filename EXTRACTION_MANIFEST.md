# MMM Pro Trading Journal - Complete File Extraction Manifest

This document lists all files from the Replit application that should be extracted to complete the application.

## Already Extracted
- package.json
- tsconfig.json
- vite.config.ts
- postcss.config.js
- .gitignore
- README.md
- client/index.html
- client/src/main.tsx

## To Extract - Root Level Config Files
```
tailwind.config.ts
drizzle.config.ts
theme.json
replit.md
```

## To Extract - Client Source Files (client/src/)

### Main App Files
- App.tsx

### Components (client/src/components/)
Organized by feature:

#### analytics/
- Various analytics components

#### checkout/
- Checkout and payment flow components

#### dashboard/
- Dashboard widget and display components

#### layout/
- Layout and navigation components

#### notifications/
- Notification display components

#### onboarding/
- Onboarding flow components

#### sections/
- Page section components

#### ui/
- Base Radix UI components (badge, button, card, dialog, form, etc.)

### Pages (client/src/pages/)
24+ page files including:
- admin-page.tsx
- auth-page.tsx
- checkout-page-simple.tsx
- checkout-page.tsx
- checkout-redirect.tsx
- checkout-success-page.tsx
- dashboard-page.tsx
- dashboard-standalone.tsx
- disclaimer-page.tsx
- forum pages
- home-page.tsx
- indicators-page.tsx
- login-page.tsx
- market-notifications-page.tsx
- not-found.tsx
- privacy-page.tsx
- refunds-page.tsx
- simple-dashboard-page.tsx
- terms-page.tsx
- trading-view-connect-page.tsx

### Lib Utilities (client/src/lib/)
- analytics.ts
- init-forum-data.ts
- protected-route.tsx
- queryClient.ts
- simple-protected-route.tsx
- utils.ts
- whop-integration.ts

### Hooks (client/src/hooks/)
- use-auth.tsx
- use-mobile.tsx
- use-toast.ts

### Assets (client/src/assets/)
Image files:
- logo-color-transparent.png
- logo-with-circle.png
- max-maserati-logo.jpg
- social-icons-round.png
- social-icons-square.png
- trading-chart.png
- optimized/ (subdirectory with optimized images)

## To Extract - Server Files (server/)

### Main Server Files
- index.ts (main entry point)
- auth.ts (authentication logic)
- db.ts (database setup)
- routes.ts (API routes)
- storage.ts (file/data storage)
- vite.ts (development server setup)

## To Extract - Shared Schema (shared/)

- schema.ts (complete database schema with Drizzle ORM)

## To Extract - Scripts (scripts/)

- Any build or utility scripts

## To Extract - Public Files (public/)

- Static assets and public files

## To Extract - Other Directories

- exports/ (exported data files)
- uploads/ (user uploaded files - may be empty/optional)

## Extraction Instructions

Use the Replit tools to read each file:

```javascript
// For each file, use read_app_file with:
replId: "09cb402d-a2a0-4dc4-8edd-d11358dc3aab"
path: "relative/path/to/file.ts"
```

### Recommended Extraction Order

1. Root config files (tailwind, drizzle, theme)
2. Shared schema (shared/schema.ts)
3. Server files (server/)
4. Client lib utilities (client/src/lib/)
5. Client hooks (client/src/hooks/)
6. Client UI base components (client/src/components/ui/)
7. Client feature components (client/src/components/analytics, checkout, etc.)
8. Client pages (client/src/pages/)
9. Client assets (client/src/assets/)
10. Public files (public/, scripts/)

## File Count Summary

- Root config files: 4
- Server files: 6
- Shared files: 1
- Client lib: 7
- Client hooks: 3
- Client UI components: ~20
- Client feature components: Multiple per folder
- Client pages: 24+
- Client assets: 8+
- **Total: 100+ files**

## Notes

- All files are available in the Replit app
- The app has cleaner organization than PropTrader Journal Pro
- Uses Radix UI components throughout
- Includes Whop integration for subscriptions
- SEO strategy and i18n support included
- Image optimization is configured

## Database Schema

The shared/schema.ts file contains the complete Drizzle ORM schema including:
- User management
- Trading accounts and trades
- Daily plans and strategies
- Notifications
- Forum/community features
- Analytics and achievements
