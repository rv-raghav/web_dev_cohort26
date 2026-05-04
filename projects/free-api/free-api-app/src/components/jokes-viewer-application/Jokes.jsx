import { useEffect, useState } from "react";

function Jokes() {
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
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="badge" style={{ marginBottom: '0.5rem' }}>FREE API VIEWER</p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Laugh a little</h1>
          <p>Read the latest random jokes from FreeAPI.</p>
        </div>
        <button onClick={() => window.location.reload()}>
          Refresh Jokes
        </button>
      </div>

      <div className="grid-container">
        {loading ? (
          <div className="loading-text">Loading jokes...</div>
        ) : error ? (
          <div className="neo-card" style={{ background: 'var(--accent-color)', color: 'white' }}>{error}</div>
        ) : jokes.length === 0 ? (
          <div className="neo-card">No jokes found.</div>
        ) : (
          jokes.map((joke) => (
            <article key={joke.id} className="neo-card">
              <p style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', flex: 1 }}>
                "{joke.content}"
              </p>
              <div>
                <span className="badge">
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
  );
}

export default Jokes;
