$(document).ready(function () {
    // Initialiser DataTable
    let table = $('#produits').DataTable({
        paging: true,
        info: true,
        searching: true
    });

    let totalMontant = 0;
    let totalPrixUnitaire = 0;
    let prixUnitaires = [];
    let quantites = [];
    let labels = [];

    // Parcourir les lignes du tableau via DataTable
    table.rows().every(function () {
        let data = this.data();
        const qte = parseFloat($(data[1]).text() || data[1]);
        const prix = parseFloat($(data[2]).text() || data[2]);
        const montant = qte * prix;
        // Mettre à jour la colonne Montant
        $(this.node()).find('td').eq(3).text(montant);
        totalMontant += montant;
        totalPrixUnitaire += prix;
        prixUnitaires.push(prix);
        quantites.push(qte);
        labels.push($(data[0]).text() || data[0]);
    });

    $('#totalMontant').text(totalMontant);
    $('#totalUt').text(totalPrixUnitaire);

    const stats = $('#en-bas p');
    stats.eq(0).text("Prix Moyen:   " + (totalPrixUnitaire / prixUnitaires.length).toFixed(2));
    stats.eq(1).text("Prix Minimal: " + Math.min(...prixUnitaires));
    stats.eq(2).text("Prix Maximal: " + Math.max(...prixUnitaires));

    // Graphique Chart.js (inchangé)
    const ctx = document.getElementById('graphique').getContext('2d');
    let graphique = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantité',
                data: quantites,
                backgroundColor: [
                    'rgba(255, 0, 242, 0.7)',
                    'rgba(255, 0, 0, 0.7)',
                    'rgba(22, 255, 1, 0.7)',
                    'rgba(0, 4, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 3,
                hoverBorderColor: 'white'
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Répartition des quantités par produit'
                }
            }
        }
    });
});