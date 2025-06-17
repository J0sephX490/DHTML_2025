window.onload = function () {
  var slides = document.querySelectorAll("#panneau > div");
  var i = 0;

  setInterval(function () {
    // Cache l'image actuelle
    slides[i].classList.remove("visible");
    slides[i].classList.add("cacher");

    // Passe à la suivante
    i = (i + 1) % slides.length;

    // Affiche la nouvelle image
    slides[i].classList.remove("cacher");
    slides[i].classList.add("visible");
  }, 4000); // toutes les 4 secondes
};
