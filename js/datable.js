window.onload = function () {
    const table = document.getElementById('produits');
    const rows = table.querySelectorAll('tbody tr');
    let totalMontant = 0;
    let totalPrixUnitaire = 0;
    let prixUnitaires = [];
    let quantites = [];
    let labels = [];

    rows.forEach(row => {
        const qte = parseFloat(row.children[1].textContent);
        const prix = parseFloat(row.children[2].textContent);
        const montant = qte * prix;
        row.children[3].textContent = montant;
        totalMontant += montant;
        totalPrixUnitaire += prix;
        prixUnitaires.push(prix);
        quantites.push(qte);
        labels.push(row.children[0].textContent);
    })

    document.getElementById('totalMontant').textContent = totalMontant;

    document.getElementById('totalUt').textContent = totalPrixUnitaire;

    const stats = document.querySelectorAll('#en-bas p');
    stats[0].textContent = "Prix Moyen:   " + (totalPrixUnitaire / prixUnitaires.length).toFixed(2);
    stats[1].textContent = "Prix Minimal: " + Math.min(...prixUnitaires);
    stats[2].textContent = "Prix Maximal: " + Math.max(...prixUnitaires);

    const ctx = document.getElementById('graphique').getContext('2d');
    let graphique = new Chart(ctx, {
        type: 'pie',
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
                hoverBorderColor:'white'
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
};