import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://api.freeapi.app/api/v1/public/cats/cat/random";

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCat = async (signal) => {
    try {
      const response = await fetch(API_URL, { signal });

      if (!response.ok) throw new Error("API failed");

      const json = await response.json();

      if (!json?.data?.image) throw new Error("Invalid data");

      setCat(json.data);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
        setError("Unable to fetch cat. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadCat = async () => {
      setLoading(true);
      setError(null);
      await fetchCat(controller.signal);
    };

    loadCat();

    return () => controller.abort();
  }, []);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    await fetchCat();
  };

  return (
    <div className="cat-shell">
      <div className="cat-content">
        <header className="cat-header">
          <p className="cat-label">🐱 Random Cat Viewer</p>
          <h1 className="cat-title">Purrfectly Random</h1>
          <p className="cat-description">
            Discover adorable cats fetched from the API.
          </p>
        </header>

        <div className="cat-display">
          {loading ? (
            <div className="status-card">
              <p>Loading a cute cat...</p>
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="status-card status-error">
              <p>{error}</p>
            </div>
          ) : cat ? (
            <div className="cat-card">
              <img
                src={cat.image}
                alt={cat.name || "Random cat"}
                className="cat-image"
              />

              <div className="cat-info">
                <h2>{cat.name}</h2>
                <p>{cat.description}</p>
                <p>
                  <strong>Temperament:</strong> {cat.temperament}
                </p>
                <p>
                  <strong>Origin:</strong> {cat.origin}
                </p>
                <p>
                  <strong>Life Span:</strong> {cat.life_span} years
                </p>
              </div>
            </div>
          ) : (
            <div className="status-card">No cat found.</div>
          )}
        </div>

        <div className="button-group">
          <button
            className="fetch-button"
            onClick={handleFetch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Another Cat"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
