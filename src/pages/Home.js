import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [featuredRecipes, setFeaturedRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch featured recipes.");
                }

                return response.json();
            })
            .then((data) => {
                const allRecipes = data.meals || [];

                const shuffledRecipes = [...allRecipes].sort(
                    () => Math.random() - 0.5
                );

                setFeaturedRecipes(shuffledRecipes.slice(0, 12));
})
            .catch(() => {
                // The homepage can still work if the image strips fail to load.
                setFeaturedRecipes([]);
            });
    }, []);

    function handleRandomRecipe() {
        setLoading(true);
        setError("");

        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch a random recipe.");
                }

                return response.json();
            })
            .then((data) => {
                const randomRecipe = data.meals?.[0];

                if (!randomRecipe) {
                    throw new Error("No recipe was found.");
                }

                navigate(`/recipes/${randomRecipe.idMeal}`);
            })
            .catch(() => {
                setError(
                    "A random recipe could not be loaded. Please try again."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const topRecipes = featuredRecipes.slice(0, 6);
    const bottomRecipes = featuredRecipes.slice(6, 12);

    function renderRecipeImages(recipes) {
        return recipes.map((recipe) => (
            <Link
                className="recipe-strip-item"
                to={`/recipes/${recipe.idMeal}`}
                key={recipe.idMeal}
                aria-label={`View ${recipe.strMeal}`}
            >
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </Link>
        ));
    }

    return (
        <main className="home-page">
            {topRecipes.length > 0 && (
                <div className="recipe-strip">
                    <div className="recipe-strip-track">
                        {renderRecipeImages(topRecipes)}
                    </div>
                </div>
            )}

            <section className="hero">
                <p className="hero-label">
                    Simple recipes for every day
                </p>

                <h2>Find your next meal</h2>

                <p className="hero-text">
                    Search for delicious recipes, discover new
                    dishes and view complete cooking instructions.
                </p>

                <div className="hero-buttons">
                    <Link className="primary-button" to="/recipes">
                        Browse Recipes
                    </Link>

                    <button
                        className="secondary-button"
                        type="button"
                        onClick={handleRandomRecipe}
                        disabled={loading}
                    >
                        {loading ? "Finding a recipe..." : "Surprise Me!"}
                    </button>
                </div>

               {error && (
    <p className="error-message" role="alert">
        {error}
    </p>
)}
            </section>

            {bottomRecipes.length > 0 && (
                <div className="recipe-strip recipe-strip-bottom">
                    <div className="recipe-strip-track">
                        {renderRecipeImages(bottomRecipes)}
                    </div>
                </div>
            )}
        </main>
    );
}

export default Home;