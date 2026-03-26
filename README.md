# Double-Entry Bank — Next.js Frontend

A production-ready Next.js frontend for the [Double-Entry Bank Ledger API](https://github.com/PaulBabatuyi/double-entry-bank-Go). Built with TypeScript, Zustand, and Tailwind CSS v4.

**Live demo:** https://golangbank.app  
**Backend repo:** https://github.com/PaulBabatuyi/double-entry-bank-Go  
**API docs (Swagger):** https://golangbank.app/swagger/index.html

![Dashboard preview](public/dashboard-preview.png)

---

## Overview

This frontend is intentionally kept simple — the focus of the overall project is the Go backend. The UI provides a working interface to exercise every backend endpoint: registration, login, account management, deposits, withdrawals, transfers, transaction history, and ledger reconciliation.

It was converted from a vanilla JavaScript single-page app into a typed, component-based Next.js application. The architecture reflects real patterns used in production frontends while keeping the code straightforward enough to serve as a learning reference alongside the backend.

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| State management | Zustand 4 |
| Styling | Tailwind CSS v4 |
| Icons | Font Awesome 6 |
| Linting | ESLint 9 + typescript-eslint |
| Package manager | Yarn 1 |

---

## Features

- **Authentication** — register and login with JWT, token persisted in `localStorage` and synced to a cookie for middleware-level route protection
- **Dashboard** — live summary of total accounts, combined balance, and transaction count
- **Account management** — create named accounts, view per-account balances
- **Transactions** — deposit, withdraw, and transfer between accounts with instant UI feedback
- **Transaction history** — paginated ledger entries per account showing debits and credits
- **Reconciliation** — trigger a backend balance check to verify stored balance matches ledger entries
- **Toast notifications** — success and error feedback on every operation
- **API proxy** — all requests are routed through Next.js rewrites, so the backend URL never leaks to the browser and CORS is handled server-side

---

## Project Structure

```
.
├── app/
│   ├── auth/
│   │   └── page.tsx          # Login / register
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Root redirect
│
├── components/
│   ├── Toast.tsx
│   ├── Providers.tsx         # Auth hydration on mount
│   └── dashboard/
│       ├── Header.tsx
│       ├── DashboardStats.tsx
│       ├── AccountsList.tsx
│       ├── TransactionHistory.tsx
│       ├── CreateAccountModal.tsx
│       ├── DepositForm.tsx
│       ├── WithdrawForm.tsx
│       └── TransferForm.tsx
│
├── lib/
│   ├── api.ts                # Typed fetch wrapper for all endpoints
│   ├── config.ts             # API base URL resolution + constants
│   ├── utils.ts              # Currency formatting, date formatting, helpers
│   ├── types/
│   │   └── index.ts          # Shared TypeScript interfaces
│   └── store/
│       ├── authStore.ts      # Auth state (Zustand)
│       └── toastStore.ts     # Toast notification state (Zustand)
│
├── middleware.ts             # Auth redirect middleware
├── next.config.ts            # API rewrites
└── public/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.x (`npm install -g yarn`)
- A running instance of the [Go backend](https://github.com/PaulBabatuyi/double-entry-bank-Go)

### 1. Install dependencies

```bash
yarn install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set the backend URL:

```env
# Local backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# Or point at the hosted instance
NEXT_PUBLIC_API_BASE_URL=https://double-entry-bank-go.onrender.com
```

### 3. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start development server with hot reload |
| `yarn build` | Production build |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `yarn type-check` | Run TypeScript compiler check without emitting |

---

## How API Calls Work

All HTTP calls go through `lib/api.ts`, which wraps `fetch` with:

- Automatic `Authorization: Bearer <token>` header injection from `localStorage`
- `401` handling — clears the stored token and fires an `auth:logout` event that `Providers.tsx` listens to
- JSON parsing with graceful fallback for non-JSON responses

The Next.js rewrite config in `next.config.ts` proxies every backend path (`/register`, `/login`, `/accounts/*`, `/transfers`, etc.) to `NEXT_PUBLIC_API_BASE_URL`. This means the browser always talks to the same origin, and you never need to configure CORS on the backend for local development.

Example:

```typescript
import { deposit } from "@/lib/api";

const { response, data } = await deposit(accountId, 250.00);

if (response.ok) {
  // data is typed as MessageResponse
}
```

---

## State Management

Two Zustand stores handle all client state:

**`authStore`** — holds the current user (email + JWT), the accounts list, and a hydration flag. Persists token and email to `localStorage` on write and reads them back on mount via the `hydrate()` action called in `Providers.tsx`.

**`toastStore`** — manages a queue of toast notifications. Each toast auto-dismisses after 4 seconds (configurable via `TOAST_DURATION` in `lib/config.ts`).

---

## Authentication Flow

```
User visits /
    │
    ▼
Providers mounts → hydrate() reads localStorage
    │
    ├─ Token found  → redirect to /dashboard
    └─ No token     → redirect to /auth
                            │
                    User logs in / registers
                            │
                    Token saved → redirect to /dashboard
                            │
                    401 on any request
                            │
                    Token cleared → auth:logout event → redirect to /auth
```

Route protection is enforced in two places: `middleware.ts` checks the `token` cookie server-side on every navigation, and `dashboard/page.tsx` checks the Zustand store client-side as a fallback.

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import the repo in Vercel
3. Add the environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
   ```
4. Deploy

No other configuration is required. The Next.js rewrites handle routing at the Edge.

### Other platforms

Any platform that supports Node.js 18+ and the `next build && next start` command will work. Set `NEXT_PUBLIC_API_BASE_URL` to point at your backend instance.

---

## Relation to the Backend

This repository is the frontend half of a two-repo project. The Go backend implements:

- Double-entry bookkeeping (every money movement writes two balanced ledger entries)
- Atomic PostgreSQL transactions with serializable isolation and automatic retry on contention
- JWT authentication
- A reconciliation endpoint that verifies stored account balances against raw ledger sums

The frontend is intentionally thin. If you are here to study the financial logic, start with the [backend repo](https://github.com/PaulBabatuyi/double-entry-bank-Go).

---

## License

MIT — see [LICENSE](LICENSE).