document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formLogin")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            alert("E-mail ou mot de passe incorrect");
          }
        })
        .then((data) => {
          data.authenticated;
          localStorage.setItem("token", JSON.stringify(data));
          window.location.href = "index.html";
        });
    });
});
