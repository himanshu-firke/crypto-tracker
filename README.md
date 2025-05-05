# 🪙 Crypto Tracker

A powerful and responsive **React-based Cryptocurrency Tracker** that displays real-time prices, market data, volume, and TradingView charts for deeper analysis. This project integrates CoinGecko's API and WebSocket updates to offer live data without the need to refresh.

---

## 🔗 Live Demo

🚀 [View the Live App on Vercel](https://crypto-tracker-swart-seven.vercel.app/)

---

## 📸 Screenshots

| Home Page | TradingView Integration |
|----------|--------------------------|
| ![Screenshot](./screenshots/home.png) | ![Chart](./screenshots/chart.png) |

---

## 🛠 Tech Stack

- **React JS**
- **Chakra UI** – UI Components & Styling
- **Axios** – API Calls
- **WebSocket** – Real-time updates
- **CoinGecko API** – Price, market, and coin data
- **TradingView Widget** – Live chart analysis (linked on each coin)
- **Vercel** – Deployment

---

## 📡 API Endpoints

- **REST API (Top 100 coins):**  
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr`

- **WebSocket (Real-time BTC & ETH):**  
  `wss://ws.coincap.io/prices?assets=bitcoin,ethereum`

---

## ✨ Features

- ✅ View 100+ cryptocurrencies with real-time data  
- ✅ Instant search functionality  
- ✅ View % changes, market cap, and 24h volume  
- ✅ Click any coin to view a TradingView chart  
- ✅ Live price updates using WebSocket  
- ✅ Clean and responsive UI  

---
