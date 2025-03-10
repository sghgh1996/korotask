# Blog Posts Management System

A modern Vue 3 application with TypeScript, Vite, and comprehensive testing.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Testing

```bash
# Run unit tests
npm run test

# Run unit tests with coverage
npm run test:coverage

# Open Cypress Test Runner
npm run cy:open

# Run Cypress tests headlessly
npm run cy:run
```

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Code Formatting

```bash
# Format code with Prettier
npm run pretty
```

## Tech Stack

- Vue 3 with Composition API
- TypeScript
- Vite
- TailwindCSS
- Cypress for E2E testing
- Vitest for unit testing
- Prettier for code formatting

## Project Structure

```
src/
├── components/
│   ├── design-system/    # Reusable UI components
│   ├── common/           # Shared components
│   ├── layout/          # Layout components
│   └── post/            # Domain-specific components
├── composables/         # Vue composables
├── pages/              # File-based routing
├── services/           # API integration
└── utils/              # Utilities and helpers
```

See the home page for more detailed documentation about the project architecture and features.