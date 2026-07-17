const fileListElement = document.getElementById("fileList");
const uploadButton = document.getElementById("uploadButton");
const newFileNameInput = document.getElementById("newFileName");
const addStudentButton = document.getElementById("addStudentButton");
const newStudentNameInput = document.getElementById("newStudentName");
const newStudentPasswordInput = document.getElementById("newStudentPassword");
const studentListElement = document.getElementById("studentList");
const submissionsListElement = document.getElementById("submissionsList");
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

let submissions = JSON.parse(localStorage.getItem("studentSubmissions")) || [];

function saveStudents() {
    localStorage.setItem("studentAccounts", JSON.stringify(students));
}

function saveSubmissions() {
    localStorage.setItem("studentSubmissions", JSON.stringify(submissions));
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

function renderSubmissions() {
    submissionsListElement.innerHTML = "";

    if (submissions.length === 0) {
        submissionsListElement.innerHTML = "<p style='color:#cfd6ff;'>No submissions yet.</p>";
        return;
    }

    submissions.forEach(submission => {
        const item = document.createElement("div");
        item.className = "submission-item";
        item.innerHTML = `
            <div class="submission-meta">
                <div>
                    <strong>${submission.student}</strong>
                    <p style="margin: 6px 0 0; color:#cfd6ff;">${submission.subject} · ${submission.unit}</p>
                </div>
                <span>${new Date(submission.submittedAt).toLocaleString()}</span>
            </div>
            <p style="margin: 12px 0 12px; color:#e5e9ff;">${submission.message}</p>
            <button data-id="${submission.id}">Remove</button>
        `;
        submissionsListElement.appendChild(item);
    });
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

submissionsListElement.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    const id = button.getAttribute("data-id");
    submissions = submissions.filter(submission => submission.id !== id);
    saveSubmissions();
    renderSubmissions();
    showMessage("Submission removed.");
});

logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("userRole");
    window.location.href = "index.html";
});

renderFiles();
renderStudents();
renderSubmissions();
renderSubmissions();