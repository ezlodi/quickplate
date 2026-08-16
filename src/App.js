import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter
      basename={
        process.env.NODE_ENV === "production"
          ? "/ezlodi"
          : "/"
      }
    >
      <div className="App">
        <header>
          <h1>
            <Link to="/">QuickPlate</Link>
          </h1>

          <nav aria-label="Main navigation">
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route
            path="/recipes/:id"
            element={<RecipeDetails />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>

        <footer>
          <p>
            © 2026 QuickPlate | Created by Elizabeta Zlodi
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;