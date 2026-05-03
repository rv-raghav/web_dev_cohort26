# Product Listing Interface

A responsive React + Vite product gallery that fetches data from a public API and displays each product in a polished card layout with an image carousel.

## ✨ Features

- **Automatic fetch on mount** with `useEffect`
- **Multi-image carousel** per product
- **Responsive grid** for desktop, tablet, and mobile
- **Shadowed card UI** with hover transitions
- **Product metadata** including category, brand, price, and rating

## 🚀 Technologies Used

- **React**
- **Vite**
- **CSS**
- **FreeAPI** for product data

## 📥 Installation

```bash
cd 06-chai-aur-react/assignments/free-api/product-listing-interface
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## 📂 Project Structure

```
product-listing-interface/
├── public/
├── src/
│   ├── components/
│   │   ├── Products.jsx
│   │   └── Products.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## 🧠 How It Works

- `Products.jsx` fetches from `https://api.freeapi.app/api/v1/public/randomproducts`
- Data is stored in state with `useState`
- Each product card displays a carousel of `images`
- The UI uses separate CSS in `Products.css`

## 🎨 UI Highlights

- Elegant white cards on a clean page background
- Responsive image cards with hover lift and shadow
- Carousel buttons for previous/next product image
- Clear product details and rating display

## 📦 Available Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run preview` — preview the production build

## 🚧 Notes

- The carousel is CSS/JS based, no external carousel library required.
- If a product has a single image, carousel controls are hidden.
- This project is designed as a reusable UI prototype.

## 🤝 Contribution

Feel free to improve styling, add filters, or extend product details for a more complete product catalog experience.
