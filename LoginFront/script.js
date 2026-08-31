let btn = document.getElementById("displayButton");

btn.addEventListener("click", async function () {
    const response = await fetch("http://localhost:5280/users", {
        method: "GET"
    });
    const data = await response.json();
    console.log(data);
});