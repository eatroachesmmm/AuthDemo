const form = document.getElementById("registerForm");
const messageElement = document.getElementById("message");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = {
        username: username,
        password: password
    };

    const response = await fetch("http://localhost:5280/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (response.ok) {
        messageElement.textContent = "User registered successfully!";
    } else if (response.status === 400) {
        messageElement.textContent = "Username already exists. Please choose a different username.";
    }
});