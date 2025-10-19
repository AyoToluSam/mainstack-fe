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
│   ├── app/
│   │   └── Quicklinks.tsx          # App Bar with quick access navigation links
│   ├── layout/
│   │   ├── Header/
│   │   │   ├── Header.tsx          # Main navigation header
│   │   │   └── _data.tsx           # Header navigation data
│   ├── shared/
│   │   └── DataTable.tsx           # Reusable data table component
│   └── ui/                          # shadcn UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── date-picker.tsx
│       ├── dropdown-menu.tsx
│       ├── select-input.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── table.tsx
│       ├── tooltip.tsx
│       └── ...
├── hooks/
│   ├── useCurrentUser.ts           # Hook for fetching current user data
│   └── useDataExport.ts            # Hook for exporting data to CSV
├── pages/
│   └── revenue/
│       ├── components/
│       │   ├── BalanceCard.tsx     # Reusable balance display card
│       │   ├── FilterSheet.tsx     # Filter sidebar with date and type filters
│       │   ├── RevenueChart.tsx    # Revenue trend chart visualization
│       │   └── TransactionsList.tsx # Transaction list with filters
│       ├── hooks/
│       │   ├── useMobile.ts        # Hook for responsive mobile detection
│       │   ├── useRevenueData.ts   # Hook for revenue data management
│       │   └── useTransactionFilters.ts # Hook for URL-based filter state
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
├── utils/
│   ├── dateRange.ts                # Date range utility functions
│   ├── formatAmount.ts             # Currency formatting utilities
│   ├── formatDate.ts               # Date formatting utilities
│   └── getInitials.ts              # User initials extraction utility
├── App.tsx                          # Root application component
├── main.tsx                         # Application entry point
└── index.css                        # Global styles and Tailwind config
```

## Features Implemented

### 1. Header Component

- ✅ Navigation bar with Home, Analytics, Revenue (active), CRM, and Apps
- ✅ User avatar with initials and dropdown options
- ✅ Sticky header with backdrop blur
- ✅ Responsive design with mobile menu toggle

### 2. Revenue Page

- ✅ Available Balance and other data from integrated endpoints
- ✅ Revenue chart with computed data from transactions
- ✅ Transactions table with Filter and Export functionalities

### 3. State Management & API Integration

- ✅ RTK Query baseApi configured with endpoint injection
- ✅ Three API endpoints integrated:
  - `/user` - User information
  - `/wallet` - Wallet/balance data
  - `/transactions` - Transaction history
- ✅ Custom hook `useRevenueData` for managing data fetching and chart data transformation
- ✅ Custom hook `useTransactionFilters` to manage filters in the URL params for persistence
- ✅ Loading states with skeleton components that indicate expected layout
- ✅ Error handling

## Design Highlights

- **Pixel-perfect implementation** matching the provided mockup
- **Responsive layout** that adapts to different screen sizes
- **Smooth transitions** and hover states

## Code Quality

- ✅ Component-based architecture with reusable components
- ✅ Code organization and separation of concerns
- ✅ Custom hooks for data management
- ✅ TypeScript with proper typing

## Running the Application

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```
