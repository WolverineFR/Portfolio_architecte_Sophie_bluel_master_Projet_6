// declaration de la fonction asynchrone
async function RecuperationDonnesApi() {
  // recuperation des informations depuis l'api
  const reponse = await fetch("http://localhost:5678/api/works");
  const Projets = await reponse.json();

  for (let i = 0; i < Projets.length; i++) {
    const article = Projets[i];

    // creation balises
    const figure = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;

    const titleElement = document.createElement("figcaption");
    titleElement.innerHTML = article.title;

    figure.appendChild(imageElement);
    figure.appendChild(titleElement);

    // ajouter les balises à son parent
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.appendChild(figure);
  }
}
// appel de la fonction
RecuperationDonnesApi();

// effet de changement de couleur des boutons du filtre
document.addEventListener("DOMContentLoaded", function () {
  const Button_Filter = document.querySelectorAll(".Button-filter");

  Button_Filter.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      Button_Filter.forEach(function (btn) {
        btn.style.backgroundColor = "";
        btn.style.color = "";
        // permet de definir une réinitialisation du style par defaut des boutons à chaques click
      });
      bouton.style.backgroundColor = "#1d6154";
      bouton.style.color = "white";
      //   au click sur un bouton, sa couleur de fond change ainsi que la couleur de la police
    });
  });
  const boutonTous = document.getElementById("Tous");
  boutonTous.click();
});
