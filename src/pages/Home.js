import { Link } from "react-router-dom";

function Home() {
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

                <Link className="primary-button" to="/recipes">
                    Browse recipes
                </Link>
            </section>
        </main>
    );
}

export default Home;