# Technology Stack & Development Guidelines

## Core Technologies

### Frontend
- **Next.js 15.2.3** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety and development experience
- **Tailwind CSS 4** - Utility-first styling with custom configuration
- **shadcn/ui** - Component library (New York style, with Radix UI primitives)

### Backend & Database
- **Convex** - Backend-as-a-service (database, server functions, real-time)
- **Inngest** - Workflow orchestration and background job processing
- **Inngest Agent Kit** - AI agent framework with Anthropic integration

### Authentication & User Management
- **Clerk** - Authentication and user management with JWT integration

### AI & Processing
- **Anthropic Claude** - AI model for document processing and content generation
- **PDF Processing** - pdf-parse and pdf2json for document extraction
- **Zod** - Schema validation and type safety

### UI Components & Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Framer Motion** (via tailwindcss-animate) - Animations
- **Geist Fonts** - Typography (Sans and Mono variants)

## Development Commands

```bash
# Development (runs frontend and backend concurrently)
npm run dev

# Frontend only
npm run dev:frontend

# Backend only (Convex)
npm run dev:backend

# Inngest development server
npm run dev:inngest

# Build for production
npm run build

# Start production server
npm run start
```

## Package Manager
- **pnpm** - Fast, disk space efficient package manager
- Lock file: `pnpm-lock.yaml`

## Code Quality & Formatting
- **ESLint 9** - Linting with Next.js configuration
- **Prettier 3.5.3** - Code formatting (minimal config)
- **TypeScript strict mode** - Enhanced type checking

## Project Configuration
- **Module type**: ESM (ES Modules)
- **Target**: ES2017
- **Path aliases**: `@/*` maps to project root
- **CSS**: Global styles in `app/globals.css`
- **Components**: shadcn/ui configuration in `components.json`