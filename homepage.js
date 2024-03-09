async function app() {
  // Récupération des travaux
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json();
  console.log(works);

  //Homepage -  Affichage des travaux
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

  //Homepage - Filtres
  const btnDefault = document.querySelector("#default");
  const btnObjets = document.querySelector("#objets");
  const btnAppartements = document.querySelector("#appart");
  const btnHotelsRestaurants = document.querySelector("#hotels");

  //Tous
  async function filterDefault() {
    btnDefault.addEventListener("click", function () {
      displayWorks(works);
    });
  }

  //Objets
  async function filterObjets() {
    btnObjets.addEventListener("click", function () {
      const projectsObjets = works.filter(function (figure) {
        return figure.categoryId === 1;
      });
      document.querySelector(".gallery").innerHTML = "";
      displayWorks(projectsObjets);
    });
  }

  //Appartements
  async function filterAppartements() {
    btnAppartements.addEventListener("click", function () {
      const projectsAppartements = works.filter(function (figure) {
        return figure.categoryId === 2;
      });
      document.querySelector(".gallery").innerHTML = "";
      displayWorks(projectsAppartements);
    });
  }

  //Hotels & Restaurants
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

  // Ouverture modal1 - Suppressions travaux
  let modal1 = null;
  const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector("#modal1");
    target.style.display = "flex";
    modal1 = target;
    modal1.addEventListener("click", closeModal);
    modal1
      .querySelector(".js-modal-close")
      .addEventListener("click", closeModal);
    modal1
      .querySelector(".js-modal-stop")
      .addEventListener("click", stopPropagation);
    const modal2 = document.querySelector("#modal2");
    modal2.style.display = "none";
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

  // Ouverture modal2 - Ajout travaux
  let modal2 = null;
  const openModalAdd = function (e) {
    e.preventDefault();
    const target = document.querySelector("#modal2");
    target.style.display = "flex";
    modal2 = target;
    modal2.addEventListener("click", closeModal);
    modal2.querySelector(".js-modal-back").addEventListener("click", openModal);
    modal2
      .querySelector(".js-modal-close")
      .addEventListener("click", closeModal);
    modal2
      .querySelector(".js-modal-stop")
      .addEventListener("click", stopPropagation);
    modal2.querySelector(".submit").addEventListener;
  };

  document.querySelectorAll(".js-modal-add").forEach((a) => {
    a.addEventListener("click", openModalAdd);
  });

  //Ajout des travaux
  async function addWorks() {
    const token = window.sessionStorage.getItem("userToken");
    const addImage = document.querySelector("#add-img");
    const title = document.querySelector("#title");
    const category = document.querySelector("#category");

    await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: JSON.stringify({
        image: addImage,
        title: title,
        category: category,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
  // Fermeture modal1 & 2
  const closeModal = function (e) {
    e.preventDefault();
    modal1.style.display = "none";
    modal2.style.display = "none";
  };

  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  displayWorks(works);
  displayWorksModal(works);
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
