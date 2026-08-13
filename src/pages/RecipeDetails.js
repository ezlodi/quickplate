import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RecipeDetails() {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch recipe.");
                }

                return response.json();
            })
            .then((data) => {
                setRecipe(data.meals ? data.meals[0] : null);
            })
            .catch(() => {
                setError(
                    "Recipe details could not be loaded. Please try again."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <main className="recipe-details-page">
                <p className="status-message">
                    Loading recipe details...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="recipe-details-page">
                <p className="status-message">{error}</p>
            </main>
        );
    }

    if (!recipe) {
        return (
            <main className="recipe-details-page">
                <p className="status-message">
                    Recipe could not be found.
                </p>

                <Link to="/recipes">Back to recipes</Link>
            </main>
        );
    }

    return (
        <main className="recipe-details-page">
            <Link className="back-link" to="/recipes">
                ← Back to recipes
            </Link>

            <article className="recipe-details-card">
                <img
                    className="recipe-details-image"
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                />

                <div className="recipe-details-content">
                    <h2>{recipe.strMeal}</h2>

                    <p>
                        <strong>Category:</strong>{" "}
                        {recipe.strCategory}
                    </p>

                    <p>
                        <strong>Origin:</strong> {recipe.strArea}
                    </p>

                    <h3>Instructions</h3>
                    <p>{recipe.strInstructions}</p>
                </div>
            </article>
        </main>
    );
}

export default RecipeDetails;