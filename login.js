const formLogin = document.querySelector("#form_login");

async function login() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const reponse = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const user = await reponse.json();
  const valeurUser = JSON.stringify(user);

  if (user.token) {
    window.sessionStorage.setItem("userToken", user.token);
    document.location.href = "http://127.0.0.1:5501/FrontEnd/";
  } else {
    messageErreur();
  }
}

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
  login();
});

// Message erreur
function messageErreur() {
  const erreur = document.createElement("p");
  erreur.innerText = "Erreur dans l’identifiant ou le mot de passe";

  formLogin.appendChild(erreur);
}
