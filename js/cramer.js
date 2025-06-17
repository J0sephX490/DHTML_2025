// Met à jour l'affichage des coefficients dès la saisie
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cramer-grid input').forEach(input => {
        input.addEventListener('input', function() {
            const id = this.id;
            const val = this.value;
            const span = document.getElementById('v' + id.toUpperCase());
            if (span) {
                span.textContent = val ? val : id.toUpperCase();
            }
        });
    });
});

/* fonction pour résoudre les systèmes par la methode de Cramer */
function resolution() {
    var liste = ["A11", "A12", "A13", "B1", "A21", "A22", "A23", "B2", "A31", "A32", "A33", "B3"];
    var valide = true;
    for (var i = 0; i < liste.length; i++) {
        var champs = document.getElementById(liste[i]);
        var valeur = champs.value.trim();
        if (valeur == "" || isNaN(valeur)) {
            champs.style.border = "2px solid red";
            valide = false;
        } else {
            champs.style.border = "";
        }
    }
    if (!valide) {
        document.getElementById("resultat").innerText = "veuillez remplir tous les champs correctement";
        return;
    }

    //déclaration des variables
    const A11 = parseFloat(document.getElementById("A11").value);
    const A12 = parseFloat(document.getElementById("A12").value);
    const A13 = parseFloat(document.getElementById("A13").value);
    const B1 = parseFloat(document.getElementById("B1").value);

    const A21 = parseFloat(document.getElementById("A21").value);
    const A22 = parseFloat(document.getElementById("A22").value);
    const A23 = parseFloat(document.getElementById("A23").value);
    const B2 = parseFloat(document.getElementById("B2").value);

    const A31 = parseFloat(document.getElementById("A31").value);
    const A32 = parseFloat(document.getElementById("A32").value);
    const A33 = parseFloat(document.getElementById("A33").value);
    const B3 = parseFloat(document.getElementById("B3").value);

    const D = A11 * A22 * A33 + A12 * A23 * A31 + A13 * A21 * A32 - (A13 * A22 * A31 + A12 * A21 * A33 + A11 * A23 * A32);

    if (D == 0) {
        document.getElementById("resultat").innerText = "l'equation n'a pas de solution";
        return;
    } else {
        const DX1 = B1 * A22 * A33 + A12 * A23 * B3 + A13 * B2 * A32 - (A13 * A22 * B3 + A12 * B2 * A33 + B1 * A23 * A32);
        const DX2 = A11 * B2 * A33 + B1 * A23 * A31 + A13 * A21 * B3 - (A13 * B2 * A31 + B1 * A21 * A33 + A11 * A23 * B3);
        const DX3 = A11 * A22 * B3 + A12 * B2 * A31 + B1 * A21 * A32 - (B1 * A22 * A31 + A12 * A21 * B3 + A11 * B2 * A32);
        let X1 = DX1 / D;
        let X2 = DX2 / D;
        let X3 = DX3 / D;

        X1 = X1.toFixed(2);
        X2 = X2.toFixed(2);
        X3 = X3.toFixed(2);

        document.getElementById("resultat").innerText = `Delta = ${D}, \n X1 = ${X1} ,\n X2 = ${X2} \n X3 = ${X3}`;
    }
}