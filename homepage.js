async function app() {
  // Récupération des travaux
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json();

  // Affichage des travaux
  async function displayWorks(element) {
    for (let i = 0; i < element.length; i++) {
      const projects = element[i];

      const gallery = document.querySelector(".gallery");
      const figure = document.createElement("figure");

      const imgElement = document.createElement("img");
      imgElement.src = projects.imageUrl;

      const titleElement = document.createElement("figcaption");
      titleElement.innerText = projects.title;

      gallery.appendChild(figure);
      figure.appendChild(imgElement);
      figure.appendChild(titleElement);
    }
  }

  // Filtres
  const btnDefault = document.querySelector("#default");
  const btnObjets = document.querySelector("#objets");
  const btnAppartements = document.querySelector("#appart");
  const btnHotelsRestaurants = document.querySelector("#hotels");

  async function filterDefault() {
    btnDefault.addEventListener("click", function () {
      displayWorks(works);
    });
  }

  async function filterObjets() {
    btnObjets.addEventListener("click", function () {
      const projectsObjets = works.filter(function (figure) {
        return figure.categoryId === 1;
      });
      document.querySelector(".gallery").innerHTML = "";
      displayWorks(projectsObjets);
    });
  }

  async function filterAppartements() {
    btnAppartements.addEventListener("click", function () {
      const projectsAppartements = works.filter(function (figure) {
        return figure.categoryId === 2;
      });
      document.querySelector(".gallery").innerHTML = "";
      displayWorks(projectsAppartements);
    });
  }

  async function filterHotelsRestaurants() {
    btnHotelsRestaurants.addEventListener("click", function () {
      const projectsHotelsRestaurants = works.filter(function (figure) {
        return figure.categoryId === 3;
      });
      document.querySelector(".gallery").innerHTML = "";
      displayWorks(projectsHotelsRestaurants);
    });
  }

  displayWorks(works);
  filterDefault();
  filterObjets();
  filterAppartements();
  filterHotelsRestaurants();
}

app();

// Enregistrement token
const token = window.sessionStorage.getItem("userToken");
const filters = document.querySelector(".filters");

if (token) {
  document.querySelector("#edition").style.display = "block";
  document.querySelector("#login").style.display = "none";
  document.querySelector("#logout").style.display = "block";
  document.querySelector(".filters").style.display = "none";
  document.querySelector("#modifier").style.display = "block";
}

// Suppression token
const logout = document.querySelector("#logout");

logout.addEventListener("click", function () {
  window.sessionStorage.clear();
  document.location.href = "http://127.0.0.1:5501/FrontEnd/";
});

console.log(token);
