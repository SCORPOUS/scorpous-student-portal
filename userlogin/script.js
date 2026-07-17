// ==============================
// HTML ELEMENTS
// ==============================

const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const message = document.querySelector(".message");
const togglePassword = document.getElementById("togglePassword");
const loginContainer = document.querySelector(".login-container");

// ==============================
// SHOW / HIDE PASSWORD
// ==============================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    } else {

        password.type = "password";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }

});

// ==============================
// LOGIN VALIDATION
// ==============================

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const user = username.value.trim();
    const pass = password.value.trim();

    // Demo Login

    if (user === "admin" && pass === "1234") {

        message.style.color = "#00ff99";
        message.innerHTML = "✔ Login Successful";

        loginButton.innerHTML = "Loading...";
        loginButton.disabled = true;

        setTimeout(() => {

            window.location.href = "welcome.html";

        }, 1200);

    }

    else {

        message.style.color = "#ff4d4d";
        message.innerHTML = "❌ Invalid Username or Password";

        loginContainer.classList.add("shake");

        setTimeout(() => {

            loginContainer.classList.remove("shake");

        }, 500);

    }

});