import { useEffect, useState } from "react";

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState("Chicken");
    const [searchTerm, setSearchTerm] = useState("Chicken");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");

        fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
                searchTerm
            )}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes.");
                }

                return response.json();
            })
            .then((data) => {
                setRecipes(data.meals || []);
            })
            .catch(() => {
                setError("Recipes could not be loaded. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [searchTerm]);

    function handleSearch(event) {
        event.preventDefault();

        const cleanedSearch = searchInput.trim();

        if (cleanedSearch) {
            setSearchTerm(cleanedSearch);
        }
    }

    return (
        <main className="recipes-page">
            <section className="recipes-header">
                <h2>Recipes</h2>
                <p>Browse and search recipes from TheMealDB.</p>
            </section>

            <form className="search-form" onSubmit={handleSearch}>
                <label htmlFor="recipe-search">
                    Search by recipe name
                </label>

                <div className="search-controls">
                    <input
                        id="recipe-search"
                        type="search"
                        value={searchInput}
                        onChange={(event) =>
                            setSearchInput(event.target.value)
                        }
                        placeholder="For example: pasta"
                    />

                    <button type="submit">Search</button>
                </div>
            </form>

            {loading ? (
                <p className="status-message">Loading recipes...</p>
            ) : error ? (
                <p className="status-message">{error}</p>
            ) : recipes.length === 0 ? (
                <p className="status-message">
                    No recipes found for “{searchTerm}”.
                </p>
            ) : (
                <ul className="recipe-list">
                    {recipes.map((recipe) => (
                        <li
                            className="recipe-card"
                            key={recipe.idMeal}
                        >
                            <img
                                className="recipe-image"
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                            />

                            <div className="recipe-card-content">
                                <h3>{recipe.strMeal}</h3>
                                <p>
                                    Category: {recipe.strCategory}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

export default Recipes;