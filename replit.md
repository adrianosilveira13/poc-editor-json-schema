# Overview

This is a JSON Schema Editor for legal petition workflows ("Fluxos de Petição"). The application allows users to create, edit, and manage structured workflows for generating legal documents using AI-powered steps. Each workflow consists of a sequence of steps that can perform tasks like generating legal arguments, inserting case law, summarizing facts, and creating final petitions.

The application provides a visual interface for building these workflows with a three-panel layout: a flow list sidebar, a central editor, and a JSON preview panel. Users can configure each step with custom prompts, parameters, and settings, then export the resulting JSON schema for use with LangChain-based AI systems.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build System:**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching

**UI Component Library:**
- Shadcn UI components (Radix UI primitives) following the "new-york" style
- Tailwind CSS for utility-first styling with custom design tokens
- Custom color system using HSL CSS variables for theme support (light/dark mode)
- Consistent spacing using Tailwind units (2, 4, 6, 8)

**Design System:**
- Typography: Inter for UI elements, JetBrains Mono for code/JSON
- Three-panel layout: 280px sidebar, flexible center editor, 360px collapsible preview
- System-based design inspired by Linear, Notion, and VSCode conventions
- Responsive breakpoints: desktop (1280px+), tablet (768-1279px), mobile (<768px)

**State Management:**
- Local component state with React hooks
- LocalStorage for persistence of flow configurations
- Form state managed through controlled components
- Zod schemas for runtime validation of flow configurations

## Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Separate development and production entry points (index-dev.ts, index-prod.ts)
- Development mode integrates Vite middleware for SSR and HMR
- Production mode serves pre-built static assets from dist/public

**API Structure:**
- RESTful API endpoints:
  - `/api/step-definitions`: Returns available step types with dynamic form field definitions
  - `/api/file-types`: Returns available file types for flow-level file selection
- JSON-based request/response format
- Raw body buffering for request verification
- Request logging with timestamps and duration tracking

**Data Layer:**
- In-memory storage implementation (MemStorage) for step definitions
- Designed to support database persistence (Drizzle ORM configured for PostgreSQL)
- Type-safe schema definitions shared between client and server

## Data Storage Solutions

**Current Implementation:**
- Client-side: LocalStorage for persisting flow configurations
- Server-side: In-memory storage for step definitions (no database currently used)

**Database Configuration (Prepared but not active):**
- Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless`
- Schema definition file: `shared/schema.ts`
- Migration system ready with Drizzle Kit
- Connection via DATABASE_URL environment variable

**Rationale:**
The application currently operates fully client-side for data persistence, storing flow configurations in the browser's LocalStorage. This provides a simple, zero-setup user experience without requiring database infrastructure. The database configuration is prepared for future scaling when multi-user support or server-side persistence becomes necessary.

## Dynamic Form System

**Backend-Driven Form Fields:**
- Step definitions include a `formFields` array that defines all form inputs for that step type
- Each form field specifies: name, label, type, storageLocation, required, placeholder, description, and options
- Supported field types: text, textarea, select, multiselect, checkbox, date, array
- Storage locations determine where field values are persisted in the step configuration:
  - `"prompt"`: Stored at top-level (step.promptName, step.promptTemplate)
  - `"config"`: Stored in step type namespace (step.config[step.type][fieldName])
  - `"parameters"`: Stored in parameters namespace (step.parameters[fieldName])

**Generic Schema:**
- Step config uses `z.record(z.string(), z.any())` to allow arbitrary configurations per step type
- No hardcoded field names in the schema or UI components
- New step types can be added by updating backend definitions only, no frontend code changes required

**File Selection:**
- Flows can specify up to 2 required input files from a backend-provided list
- File types include: PDF petitions, sentences, decisions, DOCX documents, evidence files
- File selections stored in `flow.requiredFiles` array
- FileSelector component enforces maximum limit and provides add/remove functionality

## External Dependencies

**UI Component Library:**
- Radix UI: Accessible, unstyled component primitives for dialogs, popovers, dropdowns, etc.
- Provides keyboard navigation, focus management, and ARIA attributes out of the box

**State & Data Management:**
- TanStack Query: Handles API request caching, background refetching, and loading states
- Zod: Runtime schema validation for flow configurations and type inference

**Styling:**
- Tailwind CSS: Utility-first CSS framework with custom configuration
- PostCSS with Autoprefixer for CSS processing
- Class Variance Authority (CVA): Type-safe component variant management

**Development Tools:**
- Replit-specific plugins: Error overlay, cartographer, dev banner
- TSX for TypeScript execution in development mode
- ESBuild for production bundling

**TypeScript Configuration:**
- Strict mode enabled for maximum type safety
- Path aliases: `@/*` for client code, `@shared/*` for shared schemas
- ESNext module system with bundler resolution
- Incremental compilation for faster builds

**Font Loading:**
- Google Fonts: Inter (UI), Architects Daughter, DM Sans, Fira Code, Geist Mono
- Preconnected to fonts.googleapis.com and fonts.gstatic.com for performance