# Frontend Demo — Double-Entry Bank Ledger

**Backend API:** [double-entry-bank-Go](https://github.com/PaulBabatuyi/double-entry-bank-Go)

A minimal web interface for the Go banking ledger API, built with vanilla JavaScript, Tailwind CSS, and Font Awesome. It exists to give readers a visual proof that the backend works — no build step, no framework, no tooling overhead.

## Live Demo

https://golangbank.app

## Features

### UI
- Glassmorphism design with gradient backgrounds
- Responsive layout (mobile & desktop)
- Smooth animations and transitions
- Toast notifications for user feedback

### Authentication
- User registration with email/password
- Secure login with JWT tokens
- Token persistence (localStorage)
- Auto-logout on token expiration

### Banking Operations
- **Account Management**: Create and view multiple accounts
- **Deposits**: Add funds to accounts
- **Withdrawals**: Remove funds from accounts
- **Transfers**: Move money between accounts
- **Transaction History**: View all account entries

### Dashboard
- Total accounts count
- Combined balance across all accounts
- Transaction counter
- Real-time updates after operations

## Technology Stack

- **HTML5**: Semantic markup
- **Tailwind CSS** (CDN): Utility-first styling
- **Font Awesome** (CDN): Icons
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **Fetch API**: RESTful API communication

> The frontend is intentionally minimal — vanilla JS with no build step — so readers of the FreeCodeCamp article can focus on the Go backend without frontend tooling getting in the way.

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Custom CSS (animations, effects)
├── js/
│   ├── config.js       # Configuration and API endpoint constants
│   ├── state.js        # State management
│   ├── api.js          # API service layer
│   ├── auth.js         # Authentication logic
│   ├── dashboard.js    # Dashboard operations
│   ├── transactions.js # Transaction handlers
│   ├── ui.js           # UI helper functions
│   ├── utils.js        # Utility functions
│   └── main.js         # Application entry point
└── README.md
```

## API Integration

Communicates with the Go backend. By default, requests target `window.location.origin` so the frontend works with both local development and the deployed backend without any config changes.

### Endpoints Used
- `POST /register` — Create new user
- `POST /login` — Authenticate user
- `GET /accounts` — List user accounts
- `POST /accounts` — Create new account
- `POST /accounts/{id}/deposit` — Deposit funds
- `POST /accounts/{id}/withdraw` — Withdraw funds
- `POST /transfers` — Transfer between accounts
- `GET /accounts/{id}/entries` — Get transaction history

You can override the backend URL by setting `window.API_BASE_URL` before `js/config.js` loads.

## State Management

```javascript
currentUser = {
    email: '',      // User email
    token: '',      // JWT token
    accounts: []    // Array of account objects
}
```

## Local Storage

- `token` — JWT authentication token
- `email` — User email for display

## Development Notes

### Running Locally

This frontend is served as static files by the Go backend at `http://localhost:8080`. To run it locally:

1. Start the Go backend (see [backend repo](https://github.com/PaulBabatuyi/double-entry-bank-Go))
2. Navigate to `http://localhost:8080`
3. Register a new user and start transacting

No separate frontend server is needed.

### CORS
CORS is only relevant when the frontend is served from a different origin than the backend. When both run on `http://localhost:8080`, CORS is not involved.

### Security Considerations
- Tokens are stored in localStorage (consider httpOnly cookies for a production auth system)
- Input sanitization is handled by the backend API
- Password minimum length is enforced by the backend API: 6 characters

## Browser Support

Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Requires ES6+ support (modern browsers only).

## Future Enhancements

- [ ] Account reconciliation UI
- [ ] Advanced transaction filtering and search
- [ ] Export transaction history (CSV, PDF)
- [ ] Dark/light theme toggle
- [ ] Transaction analytics charts (Chart.js)