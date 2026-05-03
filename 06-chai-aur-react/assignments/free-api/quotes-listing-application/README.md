# Quotes Listing Application

A modern React + Vite application that fetches quotes from a public API and displays them in a polished quote card layout.

## ✨ Features

- **Fetches quotes on mount** using `useEffect`
- **Responsive quote cards** with modern styling
- **Loading and error handling** built into the UI
- **Tag display** for quotes with topics
- **Simple reusable design** using separated CSS

## 🚀 Technologies Used

- **React**
- **Vite**
- **CSS**
- **FreeAPI** for quote data

## 📥 Installation

```bash
cd 06-chai-aur-react/assignments/free-api/quotes-listing-application
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## 📂 Project Structure

```
quotes-listing-application/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## 🧠 How It Works

- `App.jsx` fetches data from `https://api.freeapi.app/api/v1/public/quotes`
- The response is parsed and stored in React state
- Each quote is rendered inside a styled card
- The app shows a loading screen until the API returns

## 🎨 UI Highlights

- Clean gradient background with centered content
- Quote cards with lift effect and soft shadows
- Tag pills for topic metadata
- Author and date displayed clearly under each quote

## 📦 Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build the production app
- `npm run preview` — preview the production build locally

## 🚧 Notes

- If the API fails, the app shows an error message
- Quotes are loaded immediately when the page opens
- The UI is designed for clarity and easy reading

## 🤝 Contribution

Feel free to add features like pagination, quote search, or author filters to expand this project.
