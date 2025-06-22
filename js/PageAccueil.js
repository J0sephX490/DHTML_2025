// Affichage dynamique des sections
function showFeature(index) {
    const sections = document.querySelectorAll('.feature-section');
    sections.forEach((section, i) => {
        section.classList.toggle('active', i === index);
    });
    // Optionnel : mettre à jour l'état actif du bouton
    const buttons = document.querySelectorAll('.features-menu button');
    buttons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
}

// Changement d'image dans la section "Image"
const images = [
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img5.jpg"
];
let currentImage = 0;

function changeImage() {
    currentImage = (currentImage + 1) % images.length;
    const img = document.getElementById('image1');
    if (img) {
        img.src = images[currentImage];
    }
}

// Résolution d'équation du second degré
function equation() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    let res = '';
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        res = "Veuillez remplir tous les champs.";
    } else if (a === 0) {
        if (b === 0) {
            res = c === 0 ? "Infinité de solutions." : "Aucune solution.";
        } else {
            res = "Solution unique : x = " + (-c / b);
        }
    } else {
        const delta = b * b - 4 * a * c;
        if (delta < 0) {
            res = "Pas de solution réelle.";
        } else if (delta === 0) {
            res = "Solution double : x = " + (-b / (2 * a));
        } else {
            const x1 = (-b + Math.sqrt(delta)) / (2 * a);
            const x2 = (-b - Math.sqrt(delta)) / (2 * a);
            res = "Deux solutions : x₁ = " + x1 + ", x₂ = " + x2;
        }
    }
    document.getElementById('resultat').textContent = res;
}