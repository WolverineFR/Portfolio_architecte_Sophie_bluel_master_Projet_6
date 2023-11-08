let projets = [];

// declaration de la fonction asynchrone ------------------------------------------------
async function RecuperationDonnesApi() {
  // recuperation des informations depuis l'api
  if (projets.length < 1) {
    const reponse = await fetch("http://localhost:5678/api/works");
    const projetApi = await reponse.json();
    projets = projetApi;
  }
  return projets;
}
// appel de la fonction et recuperation des elements ---------------------------------

// --------------------------------------------------------------------------------------
// ajout des filtres avec js
async function RecuperationFiltresApi() {
  // recuperation des filtres depuis l'api
  const reponseFiltres = await fetch("http://localhost:5678/api/categories");
  const Filtres = await reponseFiltres.json();

  for (let i = 0; i < Filtres.length; i++) {
    const emplacementFiltre = Filtres[i];

    // creation balises
    const FiltresDiv = document.querySelector(".Filtres");

    const buttonFiltre = document.createElement("button");
    buttonFiltre.setAttribute("class", "Button-filter");
    buttonFiltre.textContent = emplacementFiltre.name;
    buttonFiltre.id = emplacementFiltre.id;

    FiltresDiv.appendChild(buttonFiltre);
  }
  const Button_Filter = document.querySelectorAll(".Button-filter");

  // changements couleurs bouton
  Button_Filter.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      Button_Filter.forEach(function (bouton) {
        bouton.style.backgroundColor = "";
        bouton.style.color = "";
        // permet de definir un reset du style par defaut des boutons à chaques click
      });
      const categorie = bouton.textContent;
      RecuperationDonnesApi().then((info) => {
        const projetFiltre = info.filter(
          (works) => works.category.name === categorie || categorie === "Tous"
          // les doubles || indique "ou" en js
        );

        document.querySelector(".gallery").innerHTML = "";
        projetFiltre.forEach((projet) => createDOM(projet));
      });
      bouton.style.backgroundColor = "#1d6154";
      bouton.style.color = "white";
      //   au click sur un bouton, sa couleur de fond change et la couleur de la police aussi
    });
  });
}
RecuperationFiltresApi();

// -------------------------------------------------------------------------------------

function createDOM(article) {
  // creation balises
  const figure = document.createElement("figure");

  const imageElement = document.createElement("img");
  imageElement.src = article.imageUrl;
  imageElement.alt = article.title;

  const titleElement = document.createElement("figcaption");
  titleElement.innerHTML = article.title;

  figure.appendChild(imageElement);
  figure.appendChild(titleElement);

  // ajouter les balises à son parent
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.appendChild(figure);
}
RecuperationDonnesApi().then((projets) => {
  projets.forEach((projet) => createDOM(projet));
});

// fonction pour afficher icon "modifier" quand login
function editPage() {
  const projetBoxTitle = document.querySelector(".projetBoxTitle");

  const editButton = document.createElement("button");
  const editIcon = document.createElement("i");

  editIcon.classList.add("fa-regular", "fa-pen-to-square");
  const text = document.createTextNode(" modifier");
  editButton.setAttribute("id", "editButton");
  editButton.classList.add("editButton", "modal-trigger", "modal-btn");
  projetBoxTitle.appendChild(editButton);
  editButton.appendChild(editIcon);
  editButton.appendChild(text);
}

// enlever les filtres quand connecté
function filtreRemove() {
  const removeFilter = document.querySelector(".Filtres");

  removeFilter.style.display = "none";
}

// fonction ajout barre noir edition
function editionMode() {
  const editMode = document.querySelector(".edit-mode");

  const editBarre = document.createElement("div");
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");
  const text = document.createTextNode("Mode édition");
  editBarre.classList.add("editBarre");
  editMode.appendChild(editBarre);
  editBarre.appendChild(editIcon);
  editBarre.appendChild(text);
}

// fonction permettant la déconnexion
function logOut() {
  const logoutButton = document.getElementById("login-logout");

  logoutButton.textContent = "logout";
  logoutButton.href = "";
  logoutButton.addEventListener("click", function () {
    localStorage.clear();
  });
}

// modal script
function modalActivation() {
  const modalContainer = document.querySelector(".modal-container");
  const modalTriggers = document.querySelectorAll(".modal-trigger");

  modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
  );

  function toggleModal() {
    modalContainer.classList.toggle("active");
  }
}

// ajout des images dans modal
function createDOMmodal(article) {
  const figure = document.createElement("figure");
  const imageElement = document.createElement("img");
  imageElement.src = article.imageUrl;
  imageElement.alt = article.title;
  figure.appendChild(imageElement);

  const trashBox = document.createElement("div");
  const icon = document.createElement("i");
  trashBox.classList.add("Trash-box");
  icon.classList.add("fa-solid", "fa-trash-can");

  trashBox.appendChild(icon);
  figure.appendChild(trashBox);

  // ajouter les balises à son parent
  const picsContainer = document.querySelector(".pics-container");
  picsContainer.appendChild(figure);
}

// déclaration du token + utilisation
document.addEventListener("DOMContentLoaded", function () {
  const tokenActif = localStorage.getItem("token");

  if (tokenActif) {
    filtreRemove();
    editPage();
    editionMode();
    logOut();
    modalActivation();

    RecuperationDonnesApi().then((projets) => {
      projets.forEach((projet) => {
        createDOMmodal(projet);
      });
    });
  } else {
    console.log("vous n'etes pas connecté");
  }
});
