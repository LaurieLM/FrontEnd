async function app() {
  // Récupération des travaux
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json();

  // Affichage des travaux
  async function displayWorks(element) {
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
      });
      console.log(id, trash);
    }
  }
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
}

app();

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector("#modal1");
  target.style.display = "flex";
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
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
