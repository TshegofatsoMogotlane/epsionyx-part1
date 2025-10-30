# Project Structure & Organization

## Root Level Structure

```
├── app/                    # Next.js App Router pages and layouts
├── components/             # Reusable React components
├── convex/                # Convex backend functions and schema
├── inngest/               # Inngest workflows and AI agents
├── actions/               # Server actions for form handling
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── public/                # Static assets
└── .kiro/                 # Kiro AI assistant configuration
```

## Detailed Folder Organization

### `/app` - Next.js App Router
- `layout.tsx` - Root layout with providers (Clerk, Convex)
- `page.tsx` - Homepage
- `globals.css` - Global styles and Tailwind imports
- `api/` - API routes
- `document/` - Individual document pages
- `documents/` - Document listing pages
- `manage-plan/` - Subscription management

### `/components` - UI Components
- `ui/` - shadcn/ui components (buttons, dialogs, etc.)
- `schematic/` - Schematic-specific components
- Component naming: PascalCase (e.g., `DocumentList.tsx`)
- Functional components with TypeScript
- Use `'use client'` directive for client-side components

### `/convex` - Backend Logic
- `schema.ts` - Database schema definitions
- `documents.ts` - Document-related mutations and queries
- `auth.config.ts` - Authentication configuration
- `_generated/` - Auto-generated Convex types

### `/inngest` - AI Workflows
- `client.ts` - Inngest client configuration
- `constants.ts` - Event name constants
- `agent.ts` - Main agent orchestration
- `agents/` - Individual AI agents (TutorAgent, IndustryAgent)

### `/actions` - Server Actions
- Server-side form handling functions
- File operations (upload, download)
- Authentication-required operations

### `/lib` - Utilities
- `utils.ts` - General utility functions (cn, etc.)
- `convexClient.ts` - Convex client configuration
- `schematic.ts` - Schematic integration utilities

## Naming Conventions

### Files & Folders
- **Components**: PascalCase (`DocumentList.tsx`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`)
- **Utilities**: camelCase (`convexClient.ts`)
- **Constants**: UPPER_SNAKE_CASE in files

### Code Style
- **Variables**: camelCase
- **Functions**: camelCase
- **Types/Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: Tailwind utility classes

## Import Patterns

```typescript
// External libraries first
import { NextConfig } from "next";
import { z } from "zod";

// Internal imports with @ alias
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Relative imports last
import "./globals.css";
```

## Component Structure

```typescript
'use client' // If client-side component

import React from 'react'
// Other imports...

interface ComponentProps {
  // Props definition
}

const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  // Component logic
  
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  )
}

export default ComponentName
```

## Configuration Files Location
- Root level: `package.json`, `tsconfig.json`, `next.config.ts`
- Styling: `postcss.config.mjs`, `.prettierrc`, `components.json`
- Environment: `.env.local` (not committed)
- Git: `.gitignore`