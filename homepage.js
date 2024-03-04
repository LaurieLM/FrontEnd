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

  // Affichage des travaux dans la modal 1
  async function displayWorksModal(element) {
    for (let i = 0; i < element.length; i++) {
      const project = element[i];
      const id = works[i].id;
      const gallery = document.querySelector(".modal-gallery");
      const figure = document.createElement("figure");

      const imgElement = document.createElement("img");
      imgElement.src = project.imageUrl;

      const trashIcon = document.createElement("button");
      trashIcon.classList.add("trash", `trash-${id}`);
      trashIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

      gallery.appendChild(figure);
      figure.appendChild(imgElement);
      figure.appendChild(trashIcon);

      const trash = document.querySelector(`.trash-${id}`);
      trash.addEventListener("click", function () {
        deleteWorks(id);
        figure.replaceChildren();
      });
      console.log(id, trash);
    }
  }

  let modal = null;

  const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector("#modal1");
    target.style.display = "flex";
    modal = target;
    modal.addEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-close")
      .addEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-stop")
      .addEventListener("click", stopPropagation);
  };

  const closeModal = function (e) {
    e.preventDefault();
    modal.style.display = "none";
  };

  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
  });

  // Suppression des travaux
  async function deleteWorks(param) {
    const token = window.sessionStorage.getItem("userToken");
    await fetch(`http://localhost:5678/api/works/${param}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  displayWorks(works);
  displayWorksModal(works);
  filterDefault();
  filterObjets();
  filterAppartements();
  filterHotelsRestaurants();
}

//Modal 2

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
