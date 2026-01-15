// USER LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        localStorage.setItem("currentUser", username);

        document.getElementById("loginMessage").textContent =
            "Logged in as " + username;
    });
}

// ADD RECIPE
const recipeForm = document.getElementById("recipeForm");

if (recipeForm) {
    recipeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const user = localStorage.getItem("currentUser");

        if (!user) {
            document.getElementById("recipeMessage").textContent =
                "Please log in first.";
            return;
        }

        const recipe = {
            name: document.getElementById("recipeName").value,
            category: document.getElementById("category").value,
            ingredients: document.getElementById("ingredients").value,
            instructions: document.getElementById("instructions").value,
            author: user
        };

        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));

        document.getElementById("recipeMessage").textContent =
            "Recipe added successfully!";
        recipeForm.reset();
    });
}
