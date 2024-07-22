document.addEventListener("DOMContentLoaded", (event) => {
  loadRecipes();
});

function addRecipe() {
  var recipeName = prompt("Enter the name of the food:");
  if (recipeName) {
    var ingredients = prompt("Enter ingredients (comma-separated):");
    if (ingredients) {
      var ingredientsList = ingredients.split(",").map((item) => item.trim());
      var recipeImage = prompt("Enter URL of the food image (optional):");
      var recipe = {
        name: recipeName,
        ingredients: ingredientsList,
        image: recipeImage || "https://via.placeholder.com/150",
      };
      saveRecipe(recipe);
      displayRecipe(recipe);
    }
  }
}

function saveRecipe(recipe) {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function loadRecipes() {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.forEach((recipe, index) => {
    displayRecipe(recipe, index);
  });
}

function displayRecipe(recipe, index) {
  var recipeHTML = `
    <div class="recipe" data-index="${index}">
        <h2>${recipe.name}</h2>
        <img src="${recipe.image}" alt="${recipe.name}" width="150">
        <h3>Ingredients:</h3>
        <ul>${recipe.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}</ul>
        <button onclick="deleteRecipe(${index})">Delete Recipe</button>
    </div>
  `;
  document.getElementById("recipes").innerHTML += recipeHTML;
}

function deleteRecipe(index) {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.splice(index, 1);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  document.getElementById("recipes").innerHTML = "";
  loadRecipes();
}
