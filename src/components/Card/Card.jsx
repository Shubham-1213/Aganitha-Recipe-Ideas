import { useEffect, useState } from "react";
import "./card.css";
import Youtube from "../../assets/youtube.png"
import Back from "../../assets/back.png"
const Card = ({ food }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
handleViewRecipe()
  },[])
  const handleFrontToBack = () => {
    setIsFlipped(true)
  }
  const handleViewRecipe = async () => {
    setIsLoading(true);
    try {
      // Replace with actual API endpoint
      console.log(food.idMeal);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${food.idMeal}`
      );
      const data = await response.json();
      console.log(data);
      if (data.meals && data.meals.length > 0) {
        const meal = data.meals[0];

        // Collect ingredients
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        setRecipeDetails({
            category : meal ?. strCategory,
          instructions: meal?.strInstructions,
          ingredients: ingredients,
          youtubeLink: meal?.strYoutube,
        });
      }

      
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToFront = () => {
    setIsFlipped(false);
  };

  useEffect(() => {
    console.log(isFlipped)
  }, [isFlipped])

  return (
  
      <div className="flip">
        <div className={` card ${isFlipped ? 'flipped' : ''} `}>
          <div className="face front">
            <div className="recipe-card">
              
              <div className="recipe-card__image">
              <img src={food.strMealThumb} alt={food.strMeal} />
              </div>

              <div className="recipe-card__content">
                <h2 className="recipe-card__content-section-title">
                  {recipeDetails?.category}
                </h2>
                <h1 className="recipe-card__content-recipe-title">
                  {food.strMeal}
                </h1>
                <div className="recipe-card-actions">
                  <button
                    onClick={handleFrontToBack}
                    disabled={isLoading}
                    className="js-button--recipe button button--primary"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="face back">
            <button
              onClick={handleBackToFront}
              className="recipe-flip-back"
            >
                <img src={Back} alt="back"/>
            </button>

         

            <div className="recipe-details">
              <div className="recipe-details__summary">
                <h2>Method    {recipeDetails?.youtubeLink && (
                
                <a 
                  href={recipeDetails?.youtubeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="youtube-link"
                >
                  <img src={Youtube} alt="youtube"/>
                    
                    
                </a>
)}</h2>
                <ol>
        {recipeDetails?.instructions?.split(/\n/).map((step, index) => (
          <li key={index}>{step.trim()}</li>
        ))}
      </ol>
              </div>
              <div className="recipe-details__content">
                <h2>Ingredients</h2>
                <ul >
                  {recipeDetails?.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Card;
