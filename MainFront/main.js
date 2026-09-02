const messageElement = document.getElementById("message");

const user = JSON.parse(sessionStorage.getItem("user"));

messageElement.textContent = `Welcome, ${user.username}!`;