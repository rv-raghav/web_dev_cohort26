import { useState, useEffect } from "react";
function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/meals",
      );
      const data = await response.json();
      setMeals(data.data.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="badge" style={{ marginBottom: '0.5rem' }}>CULINARY</p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Meals Listing</h1>
          <p>Discover recipes and meals from around the world.</p>
        </div>
        <button onClick={fetchMeals}>
          Refresh Meals
        </button>
      </div>

      <div className="grid-container">
        {loading ? (
          <div className="loading-text">Loading meals...</div>
        ) : (
          meals.map((meal) => (
            <div key={meal.id} className="neo-card" style={{ padding: 0 }}>
              <div style={{ borderBottom: 'var(--border-width) solid var(--border-color)' }}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{meal.strMeal}</h3>
                <span className="badge" style={{ marginBottom: '1rem' }}>{meal.strCategory || "Category"}</span>

                <button style={{ width: '100%', marginTop: '1rem' }}>View Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Meals;
