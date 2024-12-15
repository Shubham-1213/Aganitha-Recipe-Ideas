import "../MealCard/Meal.css"
import { Link } from 'react-router-dom';

function MealCard({ meal }) {
  return (
    <div className="meal-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <p>{meal.strCategory}</p>
      <Link to={`/recipe/${meal.idMeal}`}>View Details</Link>
    </div>
  );
}

export default MealCard;
