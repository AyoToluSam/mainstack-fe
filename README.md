# Mainstack FE Test - Revenue Dashboard

## Implementation Summary

This project implements a pixel-perfect revenue dashboard based on the provided design mockup. The application displays wallet balance information, revenue charts, and transaction history.

## Tech Stack

- **React 19** with TypeScript
- **Vite** (Rolldown) for build tooling
- **Redux Toolkit** with RTK Query for state management and API calls
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Recharts** for data visualization
- **Lucide React** for icons

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Header.tsx              # Main navigation header
│   └── ui/                          # shadcn UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── skeleton.tsx
│       ├── tooltip.tsx
│       └── ...
├── pages/
│   └── revenue/
│       ├── components/
│       │   ├── BalanceCard.tsx     # Reusable balance display card
│       │   ├── RevenueChart.tsx    # Chart visualization component
│       │   ├── TransactionsList.tsx # Transaction list with filters
│       │   └── index.ts            # Component exports
│       ├── hooks/
│       │   ├── useRevenueData.ts   # Custom hook for revenue data
│       │   └── index.ts            # Hook exports
│       └── Revenue.tsx             # Main revenue page
├── store/
│   ├── api/
│   │   └── baseApi.ts              # RTK Query base API configuration
│   ├── app/
│   │   ├── transactions/
│   │   │   ├── api.ts              # Transactions API endpoints
│   │   │   └── types.ts            # Transaction type definitions
│   │   ├── user/
│   │   │   ├── api.ts              # User API endpoints
│   │   │   └── types.ts            # User type definitions
│   │   └── wallet/
│   │       ├── api.ts              # Wallet API endpoints
│   │       └── types.ts            # Wallet type definitions
│   ├── index.ts                     # Store configuration
│   └── types.ts                     # Shared API types
├── App.tsx                          # Root application component
├── main.tsx                         # Application entry point
└── index.css                        # Global styles and CSS variables
```

## Features Implemented

### 1. Header Component

- ✅ Navigation bar with Home, Analytics, Revenue (active), CRM, and Apps
- ✅ Logo/brand icon
- ✅ Notification and document icons
- ✅ User avatar with initials
- ✅ Sticky header with backdrop blur
- ✅ Responsive design with mobile menu toggle

### 2. Revenue Page

- ✅ Available Balance card with withdraw button
- ✅ Ledger Balance, Total Payout, Total Revenue, and Pending Payout cards
- ✅ Revenue chart with date range (Apr 1 - Apr 30, 2022)
- ✅ 24 Transactions list with:
  - Transaction icons (deposit/withdrawal)
  - Transaction details (name, product)
  - Status badges (successful, pending, failed)
  - Amount and date
  - Filter and Export buttons

### 3. Components

- ✅ **BalanceCard**: Reusable component for displaying monetary values with labels and tooltips
- ✅ **RevenueChart**: Area chart using Recharts with custom styling to match design
- ✅ **TransactionsList**: List component with transaction cards, status badges, and action buttons

### 4. State Management & API Integration

- ✅ RTK Query baseApi configured with endpoint injection
- ✅ Three API endpoints integrated:
  - `/user` - User information
  - `/wallet` - Wallet/balance data
  - `/transactions` - Transaction history
- ✅ Custom hook `useRevenueData` for managing data fetching and chart data transformation
- ✅ Loading states with skeleton components
- ✅ Error handling

## Design Highlights

- **Pixel-perfect implementation** matching the provided mockup
- **Responsive layout** that adapts to different screen sizes
- **Modern UI** with clean spacing, borders, and hover effects
- **Color-coded status badges** (green for successful, yellow for pending, red for failed)
- **Custom chart styling** with gradient fills matching the brand orange (#FF5403)
- **Smooth transitions** and hover states throughout

## API Configuration

Set the API base URL in your `.env` file:

```
VITE_API_BASE_URL=https://fe-task-api.mainstack.io
```

## Running the Application

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Code Quality

- ✅ Component-based architecture
- ✅ Proper code organization and separation of concerns
- ✅ Reusable components with proper prop typing
- ✅ Custom hooks for data management
