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

function getStoredStudents() {
    const stored = localStorage.getItem("studentAccounts");
    if (!stored) {
        const defaultStudents = [{ username: "student", password: "1234" }];
        localStorage.setItem("studentAccounts", JSON.stringify(defaultStudents));
        return defaultStudents;
    }

    try {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
            throw new Error("Invalid student accounts format");
        }
        return parsed;
    } catch (error) {
        const defaultStudents = [{ username: "student", password: "1234" }];
        localStorage.setItem("studentAccounts", JSON.stringify(defaultStudents));
        return defaultStudents;
    }
}

function isValidStudent(username, password) {
    const students = getStoredStudents();
    return students.some(student => student.username === username && student.password === password);
}

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const user = username.value.trim();
    const pass = password.value.trim();

    // Demo Login

    if (user === "admin" && pass === "1234") {

        sessionStorage.setItem("userRole", "admin");
        sessionStorage.setItem("username", user);

        message.style.color = "#00ff99";
        message.innerHTML = "✔ Login Successful";

        loginButton.innerHTML = "Loading...";
        loginButton.disabled = true;

        setTimeout(() => {

            window.location.href = "admin.html";

        }, 1200);

    }
    else if (isValidStudent(user, pass)) {

        sessionStorage.setItem("userRole", "student");
        sessionStorage.setItem("username", user);

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