import { useState } from "react";
function App() {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/meals",
      );
      const data = await response.json();
      setMeals(data.data.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🍽️ Meals Listing</h1>

      <button className="fetch-btn" onClick={fetchMeals}>
        Fetch Meals
      </button>

      <div className="meals-container">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-card">
            <div className="image-wrapper">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-image"
              />
            </div>

            <div className="meal-content">
              <h3 className="meal-name">{meal.strMeal}</h3>
              <p className="meal-category">{meal.strCategory || "Category"}</p>

              <button className="view-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
