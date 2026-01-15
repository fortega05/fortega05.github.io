// Helper to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Helper to save users to localStorage
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Show logged-in info in nav
function showLoggedInUser() {
    const loggedInInfo = document.getElementById("loggedInInfo");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedInInfo) {
        if (currentUser) {
            loggedInInfo.innerHTML = `
                Logged in as <strong>${currentUser.username}</strong> 
                <button id="logoutBtn">Logout</button>
            `;
            document.getElementById("logoutBtn").addEventListener("click", () => {
                localStorage.removeItem("currentUser");
                location.reload();
            });
        } else {
            loggedInInfo.innerHTML = "";
        }
    }
}

// SIGN UP
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", e => {
        e.preventDefault();

        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const username = document.getElementById("signupUsername").value.trim();
        const password = document.getElementById("signupPassword").value;

        if (!email || !username || !password) return;

        let users = getUsers();

        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            document.getElementById("signupMessage").textContent = "Username already exists";
            return;
        }
        if (users.some(u => u.email === email)) {
            document.getElementById("signupMessage").textContent = "Email already registered";
            return;
        }

        users.push({ email, username, password });
        saveUsers(users);

        document.getElementById("signupMessage").textContent = "Account created! You can now log in.";
        signupForm.reset();
    });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value;

        let users = getUsers();

        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

        if (!user) {
            document.getElementById("loginMessage").textContent = "Invalid username or password";
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify({ username: user.username, email: user.email }));

        document.getElementById("loginMessage").textContent = "Logged in successfully!";
        loginForm.reset();

        showLoggedInUser();
    });
}

// On page load, show logged-in user info
document.addEventListener("DOMContentLoaded", () => {
    showLoggedInUser();
});
