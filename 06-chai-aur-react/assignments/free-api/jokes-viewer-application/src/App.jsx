import { useEffect, useState } from "react";

function App() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/randomjokes",
        );
        const data = await response.json();
        setJokes(data.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load jokes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJokes();
  }, []);

  return (
    <div className="jokes-shell">
      <div className="jokes-content">
        <header className="jokes-header">
          <div>
            <p className="jokes-label">FreeAPI Jokes Viewer</p>
            <h1 className="jokes-title">Laugh a little, scroll a lot</h1>
            <p className="jokes-description">
              Browse the latest random jokes from the FreeAPI endpoint with
              refreshing cards and a clean reading experience.
            </p>
          </div>
          <button
            className="refresh-button"
            onClick={() => window.location.reload()}
          >
            Refresh jokes
          </button>
        </header>

        <div className="jokes-grid">
          {loading ? (
            <div className="status-card">Loading jokes...</div>
          ) : error ? (
            <div className="status-card status-error">{error}</div>
          ) : jokes.length === 0 ? (
            <div className="status-card">No jokes found.</div>
          ) : (
            jokes.map((joke) => (
              <article key={joke.id} className="joke-card">
                <p className="joke-text">"{joke.content}"</p>
                <div className="joke-meta">
                  <span>
                    {joke.categories.length > 0
                      ? joke.categories.join(", ")
                      : "General"}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
