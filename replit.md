# HealthBridge - Healthcare Navigation Web Application

## Overview

HealthBridge is a comprehensive healthcare navigation web application designed to help new Canadian Permanent Residents navigate their 3-month waiting period before provincial health coverage begins. The application provides personalized insurance recommendations, timeline visualization, and actionable guidance during this critical transition period.

## System Architecture

### Frontend Architecture
- **Framework**: React.js with TypeScript using functional components and hooks
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks (useState, useEffect, useContext) with custom hooks for specific functionality
- **UI Components**: Comprehensive shadcn/ui component system with Radix UI primitives
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (currently using in-memory storage)
- **Session Management**: Prepared for connect-pg-simple integration
- **API Structure**: RESTful endpoints with /api prefix

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database (@neondatabase/serverless)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migrations**: Drizzle Kit for database schema management
- **Static Data**: JSON files for provinces, insurance providers, and eligibility rules
- **Client Storage**: localStorage for assessment data persistence

## Key Components

### Core Application Features
1. **Landing Page**: Hero section with trust indicators and Canadian government styling
2. **Assessment Wizard**: Multi-step form collecting user information (province, status, arrival date, family size)
3. **Results Dashboard**: Personalized timeline, insurance comparisons, and action checklist
4. **Resources Page**: Links to official government resources and settlement services

### Data Models
- **Province Data**: Provincial health plans, waiting periods, application URLs
- **Insurance Providers**: Coverage details, pricing, features, and availability by province
- **Eligibility Rules**: Status-based rules with waiting period modifiers
- **Assessment Data**: User inputs for personalized recommendations

### Custom Hooks
- `useAssessment`: Manages wizard state and validation
- `useWaitingPeriod`: Calculates coverage timeline based on arrival date
- `useIsMobile`: Responsive design hook
- `useToast`: Toast notification management

### Utility Functions
- Date calculations for waiting periods and coverage start dates
- Insurance filtering and pricing logic based on province and family size
- Form validation and data transformation

## Data Flow

1. **User Journey**: Landing → Assessment Wizard → Results Dashboard
2. **Data Collection**: Step-by-step form captures province, immigration status, arrival date, and family preferences
3. **Processing**: Client-side calculations determine waiting periods and filter relevant insurance providers
4. **Personalization**: Results customized based on user province, status, and timeline
5. **Persistence**: Assessment data stored in localStorage for session continuity

## External Dependencies

### UI and Styling
- **shadcn/ui**: Complete component library with consistent design system
- **Tailwind CSS**: Utility-first CSS framework with custom Canadian theme colors
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management

### Development and Build
- **Vite**: Build tool with React plugin and development server
- **TypeScript**: Type safety across frontend and backend
- **React Query**: Data fetching and caching (configured but not actively used)
- **React Hook Form**: Form management with validation

### Backend Infrastructure
- **Express.js**: Web server framework
- **Drizzle ORM**: Type-safe database interactions
- **Neon Database**: Serverless PostgreSQL hosting
- **ESBuild**: Backend bundling for production

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- Express backend with middleware for API routes
- TypeScript compilation and type checking
- Replit integration with cartographer plugin

### Production Build
- Frontend: Vite build with optimized bundling
- Backend: ESBuild compilation to ES modules
- Static assets served from dist/public directory
- Environment-based configuration

### Database Management
- Drizzle migrations in ./migrations directory
- Schema definitions in shared/schema.ts
- Database connection via environment variables

## Changelog
- June 28, 2025: Initial setup
- June 28, 2025: Fixed critical functionality issues and corrected provincial healthcare data
  - Updated 7 provinces to show immediate coverage instead of misleading 90-day universal claim
  - Fixed broken insurance quote links with working provider URLs
  - Implemented Save Plan and Share Results functionality with localStorage
  - Corrected inflated cost statistics ($150→$85, $8,500→$5,200)
  - Fixed "View Resources" button visibility on landing page

## User Preferences

Preferred communication style: Simple, everyday language.