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
- June 28, 2025: Implemented comprehensive navigation and language system
  - Created functional Help page with emergency contacts, FAQs, and healthcare resources
  - Added French/English language toggle with translation system for landing page
  - Fixed double navigation header issue on Help page
  - Updated all footer links to be functional (removed placeholder # links)
  - Corrected broken government URLs to working Health Canada links
  - Added language switching functionality in both header and footer
- June 28, 2025: Major pivot to Quebec-focused MVP
  - Pivoted from Canada-wide to Quebec-only healthcare navigation specialist
  - Removed provincial selection - hardcoded Quebec focus throughout application
  - Updated statistics: 400,000+ → 50,000+ New Quebecers, 90-day → 3-month RAMQ waiting period
  - Implemented Quebec-specific assessment flow: Status → Country → RAMQ Questions → Family Size
  - Added country selection with social security agreement detection (30+ countries)
  - Created Quebec-specific RAMQ application status questions
  - Added 5-day private insurance recommendation prominently
  - Updated insurance providers to Quebec-focused companies (Desjardins, Blue Cross Quebec, etc.)
  - Implemented bilingual terminology (RAMQ, Régie, carte d'assurance maladie)
  - Added work permit ineligibility messaging (Quebec differs from other provinces)
- June 29, 2025: Implemented bilateral agreement magic feature
  - Created comprehensive bilateral agreements database with accurate Quebec data
  - Built custom hook (useBilateralAgreement) for real-time agreement checking
  - Enhanced country selection with instant feedback on waiting period status
  - Added full agreement countries (France, Belgium, Denmark, etc.) with no waiting period
  - Added partial agreement countries (Germany, Netherlands, Italy) with case-by-case evaluation
  - Integrated agreement status into results page with detailed document requirements
  - Enhanced waiting period calculations to use bilateral agreement data
  - Added color-coded status indicators (green for full, yellow for partial, red for none)
  - Stored agreement data in localStorage for persistence across navigation
  - Added official RAMQ bilateral agreements documentation links
- June 29, 2025: Enhanced bilateral agreement UX and fixed critical navigation issues
  - Fixed premature auto-redirect to allow controlled user flow (users can review country selection before Next button)
  - Enhanced country selector with comprehensive coverage badges ("✅ Immediate Coverage", "🟡 Partial Agreement", "⏱️ Insurance Recommended")
  - Improved Start Over button styling for professional visibility and accessibility
  - Cleaned up button icons for professional appearance (removed left icons, kept right arrows)
  - Fixed infinite loop in Results component that caused "Maximum update depth exceeded" error
  - Resolved navigation issue from bilateral success to Results page with complete assessment data population
  - Updated broken RAMQ coverage link to working URL (https://www.ramq.gouv.qc.ca/en/citizens/health-insurance)
- June 29, 2025: Implemented comprehensive immigration status-specific user flows and UX fixes
  - Fixed cost estimator for visitors/students to update dynamically when selecting different insurance plans
  - Implemented auto-close calendar functionality across all user flows (PR, work permit, visitors, students)
  - Added immigration status-specific messaging and action steps in Results page
  - Visitors and international students now see "not eligible for RAMQ" with insurance-focused guidance
  - Work permit holders get conditional RAMQ eligibility messaging with insurance recommendations
  - Hidden RAMQ timeline visualization for non-eligible statuses, showing insurance-focused content instead
  - Corrected bilateral agreement logic: only permanent residents get bilateral magic redirect (work permits are always conditional)
  - Enhanced cost estimation with status-appropriate pricing and coverage period messaging

## User Preferences

Preferred communication style: Simple, everyday language.