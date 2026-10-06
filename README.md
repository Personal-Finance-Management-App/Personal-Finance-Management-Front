# 💰 FinFlow

**Personal Finance Management — simplified.**

FinFlow is a modern personal finance management application designed to bring your financial activity into one clear and organized dashboard.

Track transactions, manage budgets, explore financial insights, and get a deeper understanding of where your money goes — all in one place.

--- 
## 🚀 Project Status

🎉 **Completed**

FinFlow is a fully completed personal finance management project, with all planned features implemented and the application ready to explore.

## 🌐 Explore the Demo

Want to see FinFlow in action without going through the sign-up process?

Use the demo account below and jump straight into the dashboard.

**Demo Email:** `finance@gmail.com`
**Demo Password:** `123456A`

✨ Explore the dashboard, check your transactions, review budgets, discover financial insights, switch between English and Persian, and try the responsive interface across different screen sizes.

** Just sign in and explore.**

---

## ✨ Features

### 🔐 Authentication & Profile

* User registration and sign in
* Session-based authentication
* Protected routes
* HTTP-only session cookies
* Logout functionality
* Profile management
* Update profile information

### 📊 Dashboard & Overview

A detailed financial overview that turns raw financial data into useful insights.

* Total income and expenses,savings,debts,investments
* Account balances
* Recent transactions
* Spending by category
* Financial summaries
* Interactive charts
* Deeper financial insights

### 💳 Transactions

A complete transaction management experience:

* Create transactions
* Update transactions
* Delete transactions
* Income and expense tracking
* Transaction categories
* Sorted transactions by date
* Date management
* Filtering by transaction type such as income and expenses
* having segmented control for scroll between transactions and their types
* Giving the user the option to choose from a large number of categories and accounts
* Pagination
* Recent transaction summaries

### 💰 Accounts

A clear view of the user's financial accounts:

* Account balances
* Income and expenses per account
* Account-based financial summaries
* Support for different account types
* Automatic balance calculations

### 🎯 Budgets

Full CRUD budget management with category-based spending control:

* Create budgets
* Update budgets
* Delete budgets
* Category-based budgets
* Spending progress
* Budget limits
* Over-budget detection
* Progress indicators

### 📈 Reports

Go beyond simple totals and explore financial activity in more detail.

* Income analysis
* Expense analysis
* Category-based insights
* Account-based analysis
* Budget distribution
* Interactive charts
* Detailed financial breakdowns

### 🌍 Internationalization

* English 🇺🇸
* Persian 🇮🇷
* Language switcher
* Automatic RTL / LTR support
* Cookie-based locale management
* Clean URLs without locale prefixes

### 🎨 UI & Experience

* Responsive design
* Mobile-first approach
* Light and dark themes
* Modern dashboard interface
* Responsive navigation
* Interactive data visualization
* Consistent design system

---

## 🛠️ Tech Stack

| Technology       | Purpose                                    |
| ---------------- | ------------------------------------------ |
| **Next.js**      | React framework & application architecture |
| **TypeScript**   | Type-safe development                      |
| **Mantine**      | UI components & styling                    |
| **React Query**  | Server-state management & caching          |
| **Zustand**      | Client-side state management               |
| **next-intl**    | Internationalization                       |
| **Axios**        | HTTP client                                |
| **JSON Server**  | Mock REST API                              |
| **Tabler Icons** | Icons                                      |
| **Tailwind CSS** | Utility-first styling                      |
| **Biome**        | Formatting & linting                       |
| **Husky**        | Git hooks                                  |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file:

```env
BASE_URL=http://localhost:3001
```

### 3. Start the mock API

```bash
pnpm mock:server
```

### 4. Start the application

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🌍 Internationalization

FinFlow supports both English and Persian while keeping URLs clean.

Users can switch between languages directly from the application.

```text
English → LTR
Persian → RTL
```

---

## 🔒 Authentication Flow

FinFlow uses session-based authentication to protect private application routes.

```text
Sign Up / Sign In
        ↓
Create Session
        ↓
HTTP-only Session Cookie
        ↓
Session Validation
        ↓
Protected Panel
```

---

## 📡 Data Management

**React Query** is used for server-state management, caching, and keeping the UI synchronized with the latest data.

After successful mutations, related queries are invalidated so updated information is reflected across the application without requiring a page refresh.

---

## 📱 Responsive Design

FinFlow is built with a mobile-first approach and adapts across:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

The dashboard, forms, navigation, charts, and data views are designed to remain usable across different screen sizes.

---

## ✅ Project Status

FinFlow is a **completed personal finance management project** featuring:

* [x] Authentication & session management
* [x] Protected routes
* [x] Transaction CRUD with pagination
* [x] Budget CRUD
* [x] Profile management
* [x] Financial overview & insights
* [x] Interactive reports
* [ ] Calculations
* [x] Account summaries
* [x] English / Persian localization
* [x] RTL / LTR support
* [x] Light / dark theme
* [x] Responsive design

---

## 👩🏻‍💻 Author

**Mahzad Khosraviani**

Frontend Developer focused on building modern, responsive, and user-friendly web applications.

---

## 📄 License

This project was created as a personal portfolio project.

