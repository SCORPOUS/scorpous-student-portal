const fileListElement = document.getElementById("fileList");
const uploadButton = document.getElementById("uploadButton");
const newFileNameInput = document.getElementById("newFileName");
const addStudentButton = document.getElementById("addStudentButton");
const newStudentNameInput = document.getElementById("newStudentName");
const newStudentPasswordInput = document.getElementById("newStudentPassword");
const studentListElement = document.getElementById("studentList");
const adminMessage = document.getElementById("adminMessage");
const logoutButton = document.getElementById("logoutButton");

const userRole = sessionStorage.getItem("userRole");

if (userRole !== "admin") {
    window.location.href = "index.html";
}

let files = [
    "index.html",
    "physics.html",
    "maths.html",
    "chemistry.html",
    "welcome.html"
];

let students = JSON.parse(localStorage.getItem("studentAccounts")) || [
    { username: "student", password: "1234" }
];

function saveStudents() {
    localStorage.setItem("studentAccounts", JSON.stringify(students));
}

function renderFiles() {
    fileListElement.innerHTML = "";

    if (files.length === 0) {
        fileListElement.innerHTML = "<p style='color:#cfd6ff;'>No files available yet.</p>";
        return;
    }

    files.forEach((file, index) => {
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";
        fileItem.innerHTML = `
            <span><i class="fa-solid fa-file"></i> ${file}</span>
            <button data-index="${index}">Delete</button>
        `;
        fileListElement.appendChild(fileItem);
    });
}

function renderStudents() {
    studentListElement.innerHTML = "";

    if (students.length === 0) {
        studentListElement.innerHTML = "<p style='color:#cfd6ff;'>No students registered yet.</p>";
        return;
    }

    students.forEach((student, index) => {
        const studentItem = document.createElement("div");
        studentItem.className = "student-item";
        studentItem.innerHTML = `
            <span><i class="fa-solid fa-user-graduate"></i> ${student.username}</span>
            <button data-index="${index}">Remove</button>
        `;
        studentListElement.appendChild(studentItem);
    });
}

function showMessage(text, color = "#00ff99") {
    adminMessage.style.color = color;
    adminMessage.textContent = text;
    setTimeout(() => {
        adminMessage.textContent = "";
    }, 3000);
}

uploadButton.addEventListener("click", () => {
    const newFile = newFileNameInput.value.trim();

    if (!newFile) {
        showMessage("Enter a file name to upload.", "#ff4d4d");
        return;
    }

    if (files.includes(newFile)) {
        showMessage("That file already exists.", "#ff4d4d");
        return;
    }

    files.push(newFile);
    newFileNameInput.value = "";
    renderFiles();
    showMessage(`File "${newFile}" uploaded successfully.`);
});

addStudentButton.addEventListener("click", () => {
    const username = newStudentNameInput.value.trim();
    const password = newStudentPasswordInput.value.trim();

    if (!username || !password) {
        showMessage("Enter a username and password for the student.", "#ff4d4d");
        return;
    }

    if (students.some(student => student.username === username)) {
        showMessage("This student username already exists.", "#ff4d4d");
        return;
    }

    students.push({ username, password });
    saveStudents();
    newStudentNameInput.value = "";
    newStudentPasswordInput.value = "";
    renderStudents();
    showMessage(`Student "${username}" added successfully.`);
});

fileListElement.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    const index = Number(button.getAttribute("data-index"));
    if (Number.isNaN(index)) return;

    const removedFile = files.splice(index, 1)[0];
    renderFiles();
    showMessage(`File "${removedFile}" removed from the dashboard.`);
});

studentListElement.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    const index = Number(button.getAttribute("data-index"));
    if (Number.isNaN(index)) return;

    const removedStudent = students.splice(index, 1)[0];
    saveStudents();
    renderStudents();
    showMessage(`Student "${removedStudent.username}" removed.`);
});

logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("userRole");
    window.location.href = "index.html";
});

renderFiles();
renderStudents();