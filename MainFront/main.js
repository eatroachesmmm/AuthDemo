const messageElement = document.getElementById("welcomeText");

const user = JSON.parse(sessionStorage.getItem("user"));

messageElement.textContent = `Welcome, ${user.username}!`;