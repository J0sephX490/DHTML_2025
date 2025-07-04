// --- 1. Navigation sidebar : affiche la bonne section ---
window.showFeature = function(index) {
    const sections = document.querySelectorAll('.feature-section');
    const menuButtons = document.querySelectorAll('.sidebar ul li button');
    sections.forEach((section, i) => {
        section.classList.toggle('active', i === index);
    });
    menuButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
};

// Initialisation : affiche la première section au chargement
document.addEventListener('DOMContentLoaded', function() {
    showFeature(0);

    // --- 2. Galerie d'images ---
    const galleryImages = [
        '/images/img1.jpg',
        '/images/box-man-robot-wallpaper-11249_w635.webp',
        '/images/iphone-15-pro-max.jpeg',
        '/images/img4.webp',
        '/images/boy.jpg',
        '/images/macbook.jpg', '/images/box-man-robot-wallpaper-11249_w635.webp',
        '/images/background3.jpg'
    ];
    let currentImg = 0;
    function updateGallery(index) {
        const mainImg = document.getElementById('gallery-main');
        if (mainImg && galleryImages[index]) {
            mainImg.src = galleryImages[index];
            currentImg = index;
        }
    }
    window.changeImage = function() {
        currentImg = (currentImg + 1) % galleryImages.length;
        updateGallery(currentImg);
    };
    window.selectImage = function(idx) {
        updateGallery(idx);
    };

    // --- 3. Ajout d'événements à l'agenda ---
    document.querySelectorAll('.feature-section').forEach(section => {
        const form = section.querySelector('form');
        if (form && form.querySelector('input[type="text"]')) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const input = form.querySelector('input[type="text"]');
                const val = input.value.trim();
                if (val) {
                    const ul = section.querySelector('ul');
                    const li = document.createElement('li');
                    li.textContent = '🔖  ' + val;
                    ul.appendChild(li);
                    input.value = '';
                }
            });
        }
    });

    // On cible le switch du mode sombre dans la section paramètres (dernière section)
    const paramSection = document.querySelector('.feature-section:last-child');
    if (paramSection) {
        const darkSwitch = paramSection.querySelector('input[type="checkbox"]');
        if (darkSwitch) {
            darkSwitch.addEventListener('change', function() {
                const isDark = this.checked;
                document.body.style.background = isDark ? '#181c24' : '#f6f8fa';
                document.querySelector('.content').style.background = isDark ? '#181c24' : '#f6f8fa';
                document.querySelectorAll('.feature-section').forEach(sec => {
                    sec.style.background = isDark ? '#232946' : '#fff';
                    sec.style.color = isDark ? '#e4e7ef' : '#232946';
                });
            });
        }
    }
});