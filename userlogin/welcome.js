// ==============================
// SUBJECT CARDS
// ==============================

const subjects = document.querySelectorAll(".subject");

// ==============================
// ANIMATION ON CLICK
// ==============================

subjects.forEach(subject => {

    subject.addEventListener("click", function () {

        // Shrink animation

        this.style.transform = "scale(0.92)";

        setTimeout(() => {

            this.style.transform = "";

        }, 180);

    });

});

// ==============================
// HOVER EFFECT
// ==============================

subjects.forEach(subject => {

    subject.addEventListener("mouseenter", function () {

        this.style.boxShadow =
        "0 0 25px rgba(0,170,255,.6)";

    });

    subject.addEventListener("mouseleave", function () {

        this.style.boxShadow = "";

    });

});

// ==============================
// WELCOME ANIMATION
// ==============================

window.addEventListener("load", () => {

    subjects.forEach((subject, index) => {

        subject.style.opacity = "0";
        subject.style.transform = "translateY(60px)";

        setTimeout(() => {

            subject.style.transition =
            "all .8s ease";

            subject.style.opacity = "1";
            subject.style.transform =
            "translateY(0)";

        }, index * 250);

    });

    const submissionSection = document.getElementById("studentSubmissionSection");
    const submissionForm = document.getElementById("submissionForm");
    const subjectSelect = document.getElementById("submissionSubject");
    const unitSelect = document.getElementById("submissionUnit");
    const messageField = document.getElementById("submissionMessage");
    const feedback = document.getElementById("submissionFeedback");
    const username = sessionStorage.getItem("username") || "Unknown Student";
    const userRole = sessionStorage.getItem("userRole");

    if (userRole !== "student") {
        if (submissionSection) {
            submissionSection.style.display = "none";
        }
    }

    function buildUnitOptions() {
        unitSelect.innerHTML = Array.from({ length: 10 }, (_, index) => {
            const unitName = `Unit ${index + 1}`;
            return `<option value="${unitName}">${unitName}</option>`;
        }).join("");
    }

    function loadSubmissions() {
        try {
            return JSON.parse(localStorage.getItem("studentSubmissions") || "[]");
        } catch (error) {
            return [];
        }
    }

    function saveSubmissions(submissions) {
        localStorage.setItem("studentSubmissions", JSON.stringify(submissions));
    }

    if (submissionForm) {
        buildUnitOptions();

        submissionForm.addEventListener("submit", event => {
            event.preventDefault();

            const subject = subjectSelect.value.trim();
            const unit = unitSelect.value.trim();
            const message = messageField.value.trim();

            if (!subject || !unit || !message) {
                feedback.textContent = "Please choose a subject, unit, and enter your message.";
                feedback.style.color = "#ff4d4d";
                return;
            }

            const submissions = loadSubmissions();
            submissions.push({
                id: `${username}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
                student: username,
                subject,
                unit,
                message,
                submittedAt: Date.now()
            });
            saveSubmissions(submissions);

            submissionForm.reset();
            feedback.textContent = "Submission sent to admin.";
            feedback.style.color = "#00ff99";
        });
    }

});

const welcomePopup = document.getElementById('welcomePopup');
const closePopup = document.getElementById('closePopup');
const popupForm = document.querySelector('.popup-form');
const savedUsername = sessionStorage.getItem('username') || '';

function closeWelcomePopup() {
    if (welcomePopup) {
        welcomePopup.classList.remove('show');
    }
}

if (closePopup) {
    closePopup.addEventListener('click', closeWelcomePopup);
}

if (welcomePopup) {
    welcomePopup.addEventListener('click', (event) => {
        if (event.target === welcomePopup) {
            closeWelcomePopup();
        }
    });
}

if (popupForm) {
    const popupName = popupForm.querySelector('input[aria-label="Name"]');
    const popupPhone = popupForm.querySelector('input[aria-label="Phone"]');
    const popupEmail = popupForm.querySelector('input[aria-label="Email"]');
    const popupCourse = popupForm.querySelector('select[aria-label="Course type"]');
    const popupCaptcha = popupForm.querySelector('input[aria-label="Captcha answer"]');
    const popupFeedback = document.createElement('p');
    popupFeedback.className = 'popup-feedback';
    popupFeedback.style.marginTop = '12px';
    popupFeedback.style.fontSize = '0.95rem';
    popupFeedback.style.color = '#00ff99';
    popupForm.appendChild(popupFeedback);

    popupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameValue = popupName ? popupName.value.trim() : '';
        const phoneValue = popupPhone ? popupPhone.value.trim() : '';
        const emailValue = popupEmail ? popupEmail.value.trim() : '';
        const courseValue = popupCourse ? popupCourse.value.trim() : '';
        const captchaValue = popupCaptcha ? popupCaptcha.value.trim() : '';

        if (!nameValue || !phoneValue || !emailValue || !courseValue || !captchaValue) {
            popupFeedback.textContent = 'Please fill in all fields before submitting.';
            popupFeedback.style.color = '#ff4d4d';
            return;
        }

        if (captchaValue !== '15') {
            popupFeedback.textContent = 'The captcha answer is not correct.';
            popupFeedback.style.color = '#ff4d4d';
            return;
        }

        const submissions = JSON.parse(localStorage.getItem('studentSubmissions') || '[]');
        submissions.push({
            id: `request-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            student: savedUsername || nameValue,
            name: nameValue,
            phone: phoneValue,
            email: emailValue,
            subject: courseValue,
            message: `Phone: ${phoneValue} · Email: ${emailValue}`,
            course: courseValue,
            type: 'popup',
            submittedAt: Date.now()
        });
        localStorage.setItem('studentSubmissions', JSON.stringify(submissions));

        popupFeedback.textContent = 'Your details have been submitted successfully.';
        popupFeedback.style.color = '#00ff99';
        popupForm.reset();

        setTimeout(closeWelcomePopup, 1200);
    });
}

window.addEventListener('load', () => {
    if (welcomePopup) {
        setTimeout(() => {
            welcomePopup.classList.add('show');
        }, 500);
    }
});
