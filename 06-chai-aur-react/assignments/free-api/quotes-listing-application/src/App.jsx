import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/quotes");
        const data = await response.json();
        setQuotes(data.data.data || []);
      } catch (err) {
        setError("Failed to load quotes. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="app-shell">
      <div className="app-content">
        <header className="app-header">
          <h1 className="app-title">Quotes Listing Application</h1>
          <p className="app-subtitle">
            Discover inspiring quotes from famous authors with a clean and modern interface.
            Each card shows quote content, author details, and topic tags.
          </p>
        </header>

        <div className="quotes-grid">
          {loading ? (
            <div className="loading-row">Loading inspirational quotes...</div>
          ) : error ? (
            <div className="empty-row">{error}</div>
          ) : quotes.length === 0 ? (
            <div className="empty-row">No quotes available right now.</div>
          ) : (
            quotes.map((quote) => (
              <article key={quote.id} className="quote-card">
                <p className="quote-text">“{quote.content}”</p>
                <div className="quote-author">
                  <span className="quote-author-name">{quote.author}</span>
                  <span className="quote-meta">{quote.dateAdded}</span>
                </div>
                {quote.tags?.length > 0 && (
                  <div className="quote-tags">
                    {quote.tags.map((tag) => (
                      <span key={tag} className="quote-tag">#{tag}</span>
                    ))}
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
