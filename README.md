# QuickPlate

QuickPlate is a simple and responsive React web application for finding recipes. It retrieves recipe data from the public TheMealDB API.

## Live demo

https://front3.edukacija.online/ezlodi/

## Features

* Browse randomly selected recipes from TheMealDB
* Search for recipes by name
* Filter recipes by category
* View a recipe's image, category and origin
* Open a dynamic page with complete ingredients and cooking instructions
* Loading, error and no-results states
* Responsive layout for desktop and mobile screens
* Client-side navigation without full page reloads

## Technologies

* React
* React Router
* JavaScript
* HTML
* CSS
* TheMealDB API
* Git

## API

QuickPlate uses the public TheMealDB API to retrieve recipe and category data.

Random recipe:

```text
https://www.themealdb.com/api/json/v1/1/random.php
```

List recipe categories:

```text
https://www.themealdb.com/api/json/v1/1/list.php?c=list
```

Filter recipes by category:

```text
https://www.themealdb.com/api/json/v1/1/filter.php?c=CATEGORY
```

Search for recipes:

```text
https://www.themealdb.com/api/json/v1/1/search.php?s=SEARCH_TERM
```

Get recipe details by ID:

```text
https://www.themealdb.com/api/json/v1/1/lookup.php?i=RECIPE_ID
```

## Application routes

* `/` – Home page
* `/recipes` – Recipe browsing, filtering and search
* `/recipes/:id` – Dynamic recipe details
* `/about` – Information about the application

## Running the project locally

1. Clone or download the project.
2. Open the project folder in a terminal.
3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open `http://localhost:3000` in a browser.

## Testing

Run the automated tests with:

```bash
npm test
```

The application was also manually tested on desktop and mobile screen sizes, including navigation, recipe search, category filtering, recipe details, and loading, error and no-results states.

## Production build

Create an optimized production build with:

```bash
npm run build
```

The generated files will be available in the `build` folder.

## Accessibility and responsive design

The application uses semantic HTML elements, connected form labels, meaningful image alternative text, keyboard focus styles and an accessible navigation label.

The responsive layout adapts the recipe grid, search form, navigation and recipe details to the available screen width.

## Data source

Recipe information and images are provided by TheMealDB.

## Author

Elizabeta Zlodi
