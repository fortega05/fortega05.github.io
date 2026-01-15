// Add + display recipes without login system

document.querySelectorAll(".recipeForm").forEach(form => {
    form.addEventListener("submit", e => {
        e.preventDefault();

        const category = form.dataset.category;
        const inputs = form.querySelectorAll("input, textarea");

        const newRecipe = {
            name: inputs[0].value.trim(),
            ingredients: inputs[1].value.trim(),
            instructions: inputs[2].value.trim(),
            category: category
        };

        if (!newRecipe.name || !newRecipe.ingredients || !newRecipe.instructions) {
            alert("Please fill out all fields.");
            return;
        }

        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // Add new recipe
        recipes.push(newRecipe);

        // Save updated recipes list
        localStorage.setItem("recipes", JSON.stringify(recipes));

        // Clear form
        form.reset();

        // Reload recipes displayed on page
        loadRecipes();
    });
});

function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    document.querySelectorAll(".recipeList").forEach(list => {
        const category = list.dataset.category;

        // Start with only hardcoded recipes (clear previously dynamically added ones)
        // We'll keep the hardcoded examples in HTML, so only append user-added below
        // To avoid duplication, remove all except hardcoded articles, then append user ones

        // Strategy: Keep only hardcoded (the first <article>) and remove any after it
        const articles = list.querySelectorAll("article");
        if (articles.length > 1) {
            for (let i = articles.length - 1; i >= 1; i--) {
                articles[i].remove();
            }
        }

        // Append recipes from localStorage for this category
        recipes.filter(r => r.category === category).forEach(r => {
            // Skip duplicates if recipe matches hardcoded by name? Let's just append anyway

            const article = document.createElement("article");
            article.innerHTML = `
                <h3>${r.name}</h3>
                <p><strong>Ingredients:</strong> ${r.ingredients}</p>
                <p><strong>Instructions:</strong> ${r.instructions}</p>
            `;
            list.appendChild(article);
        });
    });
}

// Load recipes on page load
window.addEventListener("DOMContentLoaded", loadRecipes);
