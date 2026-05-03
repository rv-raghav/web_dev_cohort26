# FreeAPI Jokes Viewer Application

A React + Vite application that fetches jokes from the FreeAPI random jokes endpoint and displays them in a simple, engaging viewer.

## ✨ Features

- Fetches jokes automatically on page load
- Displays jokes in polished cards
- Includes loading and error states
- Responsive layout for desktop/mobile
- Separate CSS styling for modern UI

## 🚀 Technologies Used

- React
- Vite
- CSS
- FreeAPI random jokes endpoint

## 📥 Installation

```bash
cd 06-chai-aur-react/assignments/free-api/jokes-viewer-application
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## 🧠 API Endpoint

- `https://api.freeapi.app/api/v1/public/randomjokes`

## 📂 Project Structure

```
jokes-viewer-application/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 📦 Available Scripts

- `npm run dev` — start development server
- `npm run build` — build production assets
- `npm run preview` — preview the production build

## 💡 Notes

- The app pulls jokes from FreeAPI and shows them in a clean card layout.
- Refresh the page to load new jokes.
