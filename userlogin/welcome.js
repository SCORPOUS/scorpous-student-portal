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

});