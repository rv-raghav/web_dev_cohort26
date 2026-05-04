import { useEffect, useState } from "react";

function Quotes() {
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
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="badge" style={{ marginBottom: '0.5rem' }}>INSPIRATION</p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Quotes Application</h1>
          <p>Discover inspiring quotes with a clean and modern interface.</p>
        </div>
        <button onClick={() => window.location.reload()}>
          Refresh Quotes
        </button>
      </div>

      <div className="grid-container">
        {loading ? (
          <div className="loading-text">Loading quotes...</div>
        ) : error ? (
          <div className="neo-card" style={{ background: 'var(--accent-color)', color: 'white' }}>{error}</div>
        ) : quotes.length === 0 ? (
          <div className="neo-card">No quotes available right now.</div>
        ) : (
          quotes.map((quote) => (
            <article key={quote.id} className="neo-card" style={{ justifyContent: 'space-between' }}>
              <p style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                “{quote.content}”
              </p>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderTop: 'var(--border-width) solid var(--border-color)', paddingTop: '1rem' }}>
                  <span style={{ fontWeight: '700', textTransform: 'uppercase' }}>{quote.author}</span>
                  <span style={{ fontSize: '0.8rem' }}>{quote.dateAdded}</span>
                </div>
                {quote.tags?.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {quote.tags.map((tag) => (
                      <span key={tag} className="badge" style={{ background: 'var(--text-primary)' }}>#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default Quotes;
