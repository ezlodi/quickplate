function About() {
    return (
        <main className="about-page">
            <section className="about-card">
                <h2>About QuickPlate</h2>

                <p>
                    QuickPlate is a simple recipe discovery
                    application created with React.
                </p>

                <p>
                    Users can browse randomly selected recipes,
                    search for meals by name, filter recipes by
                    category and view complete recipe details.
                </p>

                <p>
                    Recipe information and images are provided by
                    the public TheMealDB API.
                </p>
            </section>
        </main>
    );
}

export default About;