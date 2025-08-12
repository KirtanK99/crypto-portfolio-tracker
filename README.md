# 🪙 Crypto Portfolio Tracker

A sleek and responsive web app that lets users connect their crypto wallet, view token balances, and track transactions—all in one place. Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **wagmi + viem** for Web3 integration.

## 🚀 Features

- 📊 Token overview with real-time balances
- 📂 Transactions tab with filtering and pagination
- 👛 Wallet connection using wagmi & viem
- 🧪 Fake data fallback for dev mode
- 💅 Clean and responsive UI with Tailwind

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Web3:** wagmi + viem (EVM wallet support)
- **UI:** Tailwind CSS + MUI components
- **State Management:** React Context + Hooks

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/crypto-portfolio-tracker.git
cd crypto-portfolio-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

> App will start at `http://localhost:3000`

## 🧪 Dev Notes

- Uses mock data when not connected to a wallet
- Filter logic and pagination handled via local state and `pageKey` from Alchemy
- Theme and layout powered by MUI and Tailwind CSS

## 📁 Folder Structure

```
src/
├── components/       # Reusable components
├── context/          # React context for state management
├── hooks/            # Custom React hooks
├── pages/            # Top-level tabs and screens
├── utils/            # Helper functions and formatting
├── assets/           # Static assets like icons and logos
```

## 🧹 Linting & Formatting

- ESLint config powered by `@typescript-eslint`, `react`, `jsx-a11y`, `import`, and `react-hooks`
- Style rules compatible with Prettier (optional)
- To lint:
  ```bash
  npm run lint
  ```

## 📸 Preview
![alt text](/docs/images/image.png)
![Alt text](./docs/images/image-1.png)
![Alt text](./docs/images/image-2.png)
![Alt text](./docs/images/image-3.png)
