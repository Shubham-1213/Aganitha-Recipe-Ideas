import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import MealCard from "../../components/MealCard/MealCard";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card"
import "../../components/MealCard/Meal.css"
import "../../pages/SearchResult/searchresult.css"
function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ingredient = queryParams.get("ingredient");
  const area = queryParams.get("area");
  const category = queryParams.get("category");

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to fetch meals
  const fetchMeals = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.meals || [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const fetchMealsData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchPromises = [];
        // Add fetch calls only for filters that are selected
        if (ingredient) fetchPromises.push(fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`));
        if (area) fetchPromises.push(fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`));
        if (category) fetchPromises.push(fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`));

        const results = await Promise.all(fetchPromises);
        console.log("results",results)
        // Find the intersection of all fetched meal lists
        let mealsData = results[0] || [];
        for (let i = 1; i < results.length; i++) {
          mealsData = mealsData.filter(meal => results[i].some(r => r.idMeal === meal.idMeal));
        }
    
        setMeals(mealsData);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (ingredient || area || category) {
      fetchMealsData();
    } else {
      setMeals([]);
      setLoading(false);
    }
  }, [ingredient, area, category]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="results-heading">Search Results</h1>
      {meals.length === 0 ? (
        <p>No meals found for the given search criteria.</p>
      ) : (
        <div className="meal-list">
          {meals.map((meal) => (
            <Card key={meal.idMeal} food={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
