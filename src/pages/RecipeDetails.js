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
                <p className="status-message" role="status">
                    Loading recipe details...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="recipe-details-page">
                <p className="status-message" role="alert">
                    {error}
                </p>
            </main>
        );
    }

    if (!recipe) {
        return (
            <main className="recipe-details-page">
                <p className="status-message" role="alert">
                    Recipe could not be found.
                </p>

                <Link to="/recipes">Back to recipes</Link>
            </main>
        );
    }

    const ingredients = [];

    for (let number = 1; number <= 20; number++) {
        const ingredient = recipe[`strIngredient${number}`];
        const measure = recipe[`strMeasure${number}`];

        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure ? measure.trim() : ""
            });
        }
    }

    const instructionSteps = (recipe.strInstructions || "")
        .split(/▢|\r?\n|(?=step\s+\d+)/i)
        .map((step) =>
            step
                .replace(/^step\s+\d+[:.\s-]*/i, "")
                .trim()
        )
        .filter((step) => step !== "");

    return (
        <main className="recipe-details-page">
            <Link className="back-link" to="/recipes">
                ← Back to recipes
            </Link>

            <article className="recipe-details-card">
                <section className="recipe-summary">
                    <img
                        className="recipe-details-image"
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                    />

                    <div className="recipe-summary-content">
                        <h2>{recipe.strMeal}</h2>

                        <p>
                            <strong>Category:</strong>{" "}
                            {recipe.strCategory}
                        </p>

                        <p>
                            <strong>Origin:</strong> {recipe.strArea}
                        </p>
                        <div className="recipe-links">
                            {recipe.strYoutube && (
                                <a
                                    href={recipe.strYoutube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Watch on YouTube
                                </a>
                            )}

                            {recipe.strSource && (
                                <a
                                    href={recipe.strSource}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View original source
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                <section className="recipe-instructions">
                    <h3>Instructions</h3>

                    {instructionSteps.length > 1 ? (
                        <ol className="instruction-list">
                            {instructionSteps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    ) : recipe.strInstructions?.trim() ? (
                        <p>{recipe.strInstructions}</p>
                    ) : (
                        <p>No instructions are available for this recipe.</p>
                    )}
                </section>

                <aside className="recipe-ingredients">
                    <h3>Ingredients</h3>

                    <ul className="ingredient-list">
                        {ingredients.map((item, index) => (
                            <li key={index}>
                                {item.measure && (
                                    <span className="ingredient-measure">
                                        {item.measure}
                                    </span>
                                )}

                                <span>{item.ingredient}</span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </article>
        </main>
    );
}

export default RecipeDetails;