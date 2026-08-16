import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRandomRecipes();

        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch categories.");
                }

                return response.json();
            })
            .then((data) => {
                setCategories(data.meals || []);
            })
            .catch(() => {
                setError("Categories could not be loaded.");
            });
    }, []);

    function loadRandomRecipes() {
        setLoading(true);
        setError("");

        const randomRequests = Array.from({ length: 14 }, () =>
            fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch recipes.");
                    }

                    return response.json();
                })
        );

        Promise.all(randomRequests)
            .then((results) => {
                const randomRecipes = results
                    .map((result) => result.meals?.[0])
                    .filter(Boolean);

                const uniqueRecipes = randomRecipes.filter(
                    (recipe, index, allRecipes) =>
                        index ===
                        allRecipes.findIndex(
                            (item) => item.idMeal === recipe.idMeal
                        )
                );

                setRecipes(uniqueRecipes.slice(0, 12));
            })
            .catch(() => {
                setError("Recipes could not be loaded. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleSearch(event) {
        event.preventDefault();

        const cleanedSearch = searchInput.trim();

        if (!cleanedSearch) {
            return;
        }

        setLoading(true);
        setError("");
        setSearchTerm(cleanedSearch);
        setSelectedCategory("");

        fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
                cleanedSearch
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
    }

    function handleCategoryChange(event) {
        const category = event.target.value;

        setSelectedCategory(category);
        setSearchInput("");
        setSearchTerm("");

        if (!category) {
            loadRandomRecipes();
            return;
        }

        setLoading(true);
        setError("");

        fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
                category
            )}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes.");
                }

                return response.json();
            })
            .then((data) => {
                const categoryRecipes = (data.meals || []).map((recipe) => ({
                    ...recipe,
                    strCategory: category
                }));

                setRecipes(categoryRecipes);
            })
            .catch(() => {
                setError("Recipes could not be loaded. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <main className="recipes-page">
            <section className="recipes-header">
                <h2>Recipes</h2>
                <p>Browse and search recipes from TheMealDB.</p>
            </section>

            <div className="recipe-controls">
                <div className="category-filter">
                    <label htmlFor="category-select">
                        Filter by category
                    </label>

                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        disabled={loading}
                    >
                        <option value="">All categories</option>

                        {categories.map((category) => (
                            <option
                                key={category.strCategory}
                                value={category.strCategory}
                            >
                                {category.strCategory}
                            </option>
                        ))}
                    </select>
                </div>

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

                        <button type="submit" disabled={loading}>
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {loading ? (
                <p className="status-message" role="status">
                    Loading recipes...
                </p>
            ) : error ? (
                <p className="status-message" role="alert">
                    {error}
                </p>
            ) : recipes.length === 0 ? (
                <p className="status-message">
                    {searchTerm
                        ? `No recipes found for “${searchTerm}”.`
                        : "No recipes found."}
                </p>
            ) : (
                <ul className="recipe-list">
                    {recipes.map((recipe) => (
                        <li
                            className="recipe-card"
                            key={recipe.idMeal}
                        >
                            <Link
                                className="recipe-card-link"
                                to={`/recipes/${recipe.idMeal}`}
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
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

export default Recipes;