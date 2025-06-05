# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Alternative start command with host and auto-open
pnpm start
```

## Architecture Overview

### Tech Stack

- **Svelte 5** with Vite for fast development
- **Tailwind CSS** with custom design tokens matching Figma design
- **svelte-spa-router** for client-side routing
- **shadcn-ui** components adapted for Svelte

### Project Structure

```
src/
├── api/                    # API layer
│   ├── client.js          # HTTP client configuration
│   ├── services/          # Business logic services
│   └── mocks/             # Mock data for development
├── features/              # Feature-based modules
│   ├── auth/             # Authentication
│   ├── dashboard/        # Dashboard with stats and charts
│   ├── tracking/         # Order tracking
│   ├── receiving/        # Order receiving
│   ├── storage/          # Storage management
│   ├── pickup/           # Order pickup
│   ├── locker/           # Locker management
│   └── config/           # System configuration (admin only)
├── components/            # Reusable components
│   ├── shared/           # App-wide components (Header, Sidebar, Footer)
│   └── ui/               # Base UI components
├── layouts/              # Layout components
├── lib/                  # Utilities and stores
│   ├── stores/           # Svelte stores
│   ├── actions/          # Svelte actions
│   └── utils.js          # Utility functions (cn, etc.)
├── routes/               # Routing configuration
└── stores/               # Global stores
```

### Routing Architecture

The application uses `svelte-spa-router` with lazy loading and route guards:

- **Public routes**: `/`, `/login`
- **Protected routes**: Require authentication via `authStore`
- **Admin routes**: `/config/*` routes require admin role
- All routes are lazy-loaded for performance

### State Management

- **authStore**: Manages authentication state globally
- **Feature stores**: Each feature has its own store in `lib/stores/`
- Mock services return simulated data for development

### API Architecture

- **ApiClient**: Base HTTP client at `src/api/client.js`
- **Services**: Business logic layer in `src/api/services/`
- **Mocks**: Development data in `src/api/mocks/`
- Environment variable `VITE_API_URL` configures the API endpoint

### Design System

The project uses custom Tailwind configuration to match Figma design:

- **Brand color**: Torra orange (#FF5101)
- **Typography**: Inter and Roboto fonts
- **Animations**: Custom float, slide-in, fade-in animations
- **Components**: Follow shadcn-ui patterns adapted for Svelte

### Import Aliases

```javascript
$lib → ./src/lib
$components → ./src/lib/components
$pages → ./src/lib/pages
$assets → ./src/assets
```

## Development Guidelines

### Feature Development

Each feature follows a consistent structure:

- `components/`: Feature-specific components
- `pages/`: Page components (routed views)
- Services and mocks follow the same naming pattern

### Authentication Flow

- Login state managed by `authStore`
- Route guards check authentication before rendering
- API client automatically includes auth token when set

### Mock Data

Development uses mock services that return realistic data structures. Each mock includes delay simulation for testing
loading states.