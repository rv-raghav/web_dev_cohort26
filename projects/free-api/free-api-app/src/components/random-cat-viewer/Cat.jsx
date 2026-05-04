import { useEffect, useState } from "react";

const API_URL = "https://api.freeapi.app/api/v1/public/cats/cat/random";

function Cat() {
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
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="badge" style={{ marginBottom: '0.5rem' }}>CATS</p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Random Cat Viewer</h1>
          <p>Discover adorable cats fetched from the API.</p>
        </div>
        <button onClick={handleFetch} disabled={loading}>
          {loading ? "Loading..." : "Get Another Cat"}
        </button>
      </div>

      <div>
        {loading ? (
          <div className="loading-text">Loading a cute cat...</div>
        ) : error ? (
          <div className="neo-card" style={{ background: 'var(--accent-color)', color: 'white' }}>
            <p>{error}</p>
          </div>
        ) : cat ? (
          <div className="neo-card" style={{ padding: 0, display: 'flex', flexDirection: 'column', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ borderBottom: 'var(--border-width) solid var(--border-color)', height: '400px' }}>
              <img
                src={cat.image}
                alt={cat.name || "Random cat"}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{cat.name}</h2>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>{cat.description}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
          </div>
        ) : (
          <div className="neo-card">No cat found.</div>
        )}
      </div>
    </div>
  );
}

export default Cat;
