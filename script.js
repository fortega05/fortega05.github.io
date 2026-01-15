// SIGN UP
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("signupUsername").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.includes(username)) {
            document.getElementById("signupMessage").textContent = "User already exists";
            return;
        }

        users.push(username);
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("signupMessage").textContent = "Account created!";
    });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (!users.includes(username)) {
            document.getElementById("loginMessage").textContent = "User not found";
            return;
        }

        localStorage.setItem("currentUser", username);
        document.getElementById("loginMessage").textContent = "Logged in!";
    });
}

// ADD + DISPLAY RECIPES
document.querySelectorAll(".recipeForm").forEach(form => {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const user = localStorage.getItem("currentUser");
        if (!user) return alert("Please login first");

        const inputs = form.querySelectorAll("input, textarea");
        const recipe = {
            name: inputs[0].value,
            ingredients: inputs[1].value,
            instructions: inputs[2].value,
            category: form.dataset.category,
            author: user
        };

        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));

        form.reset();
        loadRecipes();
    });
});

function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    document.querySelectorAll(".recipeList").forEach(list => {
        const category = list.dataset.category;
        list.innerHTML = "";

        recipes
            .filter(r => r.category === category)
            .forEach(r => {
                list.innerHTML += `
                    <article>
                        <h3>${r.name}</h3>
                        <p><strong>Ingredients:</strong> ${r.ingredients}</p>
                        <p><strong>Instructions:</strong> ${r.instructions}</p>
                        <p><em>By ${r.author}</em></p>
                    </article>
                `;
            });
    });
}

loadRecipes();
