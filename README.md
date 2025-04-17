# Item Management Dashboard

A modern React application for managing items with a clean UI and robust state management.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Technology Used](#technology-used)
- [Project Structure](#project-structure)
- [Author](#author)

## Features

- 📝 CRUD operations for items
- 🌓 Light/dark mode support
- 🚀 Instant form validation with Zod
- 📊 Real-time data fetching with React Query
- 💅 Beautiful UI components with shadcn/ui
- 🔊 Toast notifications with Sonner
- ✨ Optimistic updates for smooth UX

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Backend API server (see [backend README](#) for setup)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/anrisys/test-case-2_frontend
   cd my-frontend-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

- Create a `.env` file in the root directory.
- Add the necessary environment variables:

  ```
  VITE_API_URL=http://localhost:PORT/api/barang
  ```

- You can use this repository as the [backend](https://github.com/anrisys/test-case-2_API-backend.git)

## Running the application

### Development

To run the server:

```bash
npm run dev
```

## Technology used

### Core

- React 19
- TypeScript
- Vite

### State Management

- React Query (TanStack Query)
- React Hook Form

### UI Components

- shadcn/ui (Radix + TailwindCSS)
- Lucide React Icons

### Validation

- Zod
- @hookform/resolvers

### Styling

- TailwindCSS
- Tailwind Merge
- Tailwind Animate

## Project Structure

```
src/
├── api/               # API client and hooks
├── components/        # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── items/         # Item-specific components
├── lib/               # Dependency configuration
├── schemas/           # Schema for zod validation
├── utils/             # Utility functions
├── types.ts           # Type definitions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Author

The author of this app is Anris Y. Simorangkir.

[LinkedIn](https://www.linkedin.com/in/anris-y-simorangkir/)

[Gmail](mailto:anris.y.simorangkir@gmail.com)
