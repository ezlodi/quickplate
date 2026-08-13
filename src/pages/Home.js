        function Home() {
return (
    <main>
<h2>Find your next meal</h2>
<p>Search for simple and delicious recipes.</p>

<form>
  <label htmlFor="recipe-search">Search recipes</label>
  <input
    id="recipe-search"
    type="text"
    placeholder="Enter a recipe name"
  />
  <button type="submit">Search</button>
</form>
    </main>
);
}

export default Home;