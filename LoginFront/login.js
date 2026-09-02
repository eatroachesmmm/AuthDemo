const form = document.getElementById("loginForm");
const messageElement = document.getElementById("message");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = {
        username: username,
        password: password
    };

    const response = await fetch("http://localhost:5280/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (response.ok) {
        sessionStorage.setItem("user", JSON.stringify(userData));

        window.location.href = "../MainFront/main.html";
    } else if (response.status === 400) {
        messageElement.textContent = "Invalid username or password. Please try again.";
    }
});