import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Recipe() {
  const { id } = useParams(); // Get the meal ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>No recipe found</div>;
  }

  const {
    strMeal,
    strInstructions,
    strMealThumb,
    strYoutube,
    ...ingredients
  } = recipe;

  const ingredientList = Object.keys(ingredients)
    .filter((key) => key.includes('strIngredient') && ingredients[key])
    .map((key) => ingredients[key]);

  return (
    <div className='main-container'>
      <h1>{strMeal}</h1>
      <img src={strMealThumb} alt={strMeal} />
      {/* <p>{strInstructions}</p> */}

      <h3>Ingredients:</h3>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {/* {strYoutube && (
        <div>
          <h3>Watch the Recipe:</h3>
          <a href={strYoutube} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </a>
        </div>
      )} */}
    </div>
  );
}

export default Recipe;
