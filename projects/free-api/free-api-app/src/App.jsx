import { useState } from 'react';
import { 
  Smile, 
  Utensils, 
  ShoppingBag, 
  Quote, 
  Cat as CatIcon, 
  MonitorPlay as YoutubeIcon,
  Users as UsersIcon,
  Menu,
  X
} from 'lucide-react';

import Jokes from "./components/jokes-viewer-application/Jokes.jsx"
import Meals from "./components/meals-listing-interface/Meals.jsx"
import Products from "./components/product-listing-interface/Products.jsx"
import Quotes from "./components/quotes-listing-application/Quotes.jsx"
import Cat from "./components/random-cat-viewer/Cat.jsx"
import Youtube from "./components/youtube-video-listing-ui/Youtube.jsx"
import Users from "./components/random-users-ui/Users.jsx"

const apps = [
  { id: 'jokes', name: 'Jokes', icon: Smile, component: Jokes },
  { id: 'meals', name: 'Meals', icon: Utensils, component: Meals },
  { id: 'products', name: 'Products', icon: ShoppingBag, component: Products },
  { id: 'quotes', name: 'Quotes', icon: Quote, component: Quotes },
  { id: 'cat', name: 'Random Cat', icon: CatIcon, component: Cat },
  { id: 'youtube', name: 'YouTube', icon: YoutubeIcon, component: Youtube },
  { id: 'users', name: 'Users', icon: UsersIcon, component: Users },
];

function App() {
  const [activeApp, setActiveApp] = useState('jokes');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const ActiveComponent = apps.find(app => app.id === activeApp)?.component || Jokes;
  const activeAppName = apps.find(app => app.id === activeApp)?.name || 'Jokes';

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1>API APP</h1>
          <button className="mobile-close" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                className={`nav-item ${activeApp === app.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveApp(app.id);
                  setIsSidebarOpen(false);
                }}
              >
                <Icon size={20} />
                <span>{app.name}</span>
              </button>
            )
          })}
        </nav>
        
        <div className="sidebar-footer">
          <p>© 2026 FREE API</p>
          <p>JAPANESE EDITION</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="marquee-container">
          <div className="marquee-content">
            <span>探索する (EXPLORE)</span> • <span>発見する (DISCOVER)</span> • <span>創造する (CREATE)</span> • 
            <span>探索する (EXPLORE)</span> • <span>発見する (DISCOVER)</span> • <span>創造する (CREATE)</span> • 
            <span>探索する (EXPLORE)</span> • <span>発見する (DISCOVER)</span> • <span>創造する (CREATE)</span> •
            <span>探索する (EXPLORE)</span> • <span>発見する (DISCOVER)</span> • <span>創造する (CREATE)</span>
          </div>
        </div>

        <header className="content-header">
          <div className="header-left">
            <button className="mobile-menu" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h2>{activeAppName}</h2>
          </div>
        </header>

        <div className="content-body">
          <ActiveComponent />
        </div>
      </main>
    </div>
  )
}

export default App
