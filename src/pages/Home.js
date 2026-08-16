import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
                setError("A random recipe could not be loaded. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <main className="home-page">
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

                {error && <p className="error-message">{error}</p>}
            </section>
        </main>
    );
}

export default Home;