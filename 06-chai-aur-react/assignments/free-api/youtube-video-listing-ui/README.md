# 🎬 YouTube Video Listing UI

A beautiful, modern React application that fetches and displays YouTube videos from a public API with an elegant card-based interface.

## ✨ Features

- **🎨 Modern UI Design**: Beautiful gradient background with smooth animations
- **📱 Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **🎭 Interactive Cards**: Hover effects with smooth transitions and scaling
- **⚡ Fast Loading**: Built with Vite for lightning-fast development and builds
- **🔄 Real-time Data**: Fetches latest YouTube videos from public API
- **🎯 User-Friendly**: Clean, intuitive interface with clear call-to-action

## 🛠️ Technologies Used

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with animations and gradients
- **ESLint** - Code quality and consistency
- **FreeAPI** - Public API for YouTube video data

## 📦 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rv-raghav/web_dev_cohort26.git
   cd web_dev_cohort26/06-chai-aur-react/assignments/free-api/youtube-video-listing-ui
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎯 How It Works

1. **Click "Load Videos"** button to fetch YouTube videos
2. **Beautiful cards** display with thumbnails, titles, and descriptions
3. **Hover effects** provide interactive feedback
4. **Responsive grid** adapts to different screen sizes

## 📁 Project Structure

```
youtube-video-listing-ui/
├── public/
├── src/
│   ├── components/
│   │   ├── Youtube.jsx      # Main component
│   │   └── Youtube.css      # Styling
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design Highlights

- **Gradient Background**: Purple gradient for modern aesthetic
- **Card Animations**: Smooth hover effects with elevation
- **Typography**: Clean, readable fonts with proper hierarchy
- **Color Scheme**: YouTube-inspired red accents with professional grays
- **Responsive**: Mobile-first design that scales beautifully

## 🔧 API Integration

Uses the FreeAPI service to fetch YouTube video data:

- Endpoint: `https://api.freeapi.app/api/v1/public/youtube/videos`
- Returns paginated video data with thumbnails and metadata
- Handles nested API response structure

## 📱 Responsive Breakpoints

- **Desktop**: 1400px max-width grid
- **Tablet**: 768px breakpoint with adjusted spacing
- **Mobile**: 480px breakpoint with single-column layout

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is part of a learning cohort and is available under the MIT License.
