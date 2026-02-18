
// =========================
// Particules animées
// =========================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = 50;
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            // Mouvement
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Rebond
            if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
            
            // Dessin
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${p.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// =========================
// Animation 3D au scroll
// =========================
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    
                    // Animation des éléments enfants
                    const cards = entry.target.querySelectorAll('.tool-card, .team-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = 'translateY(0) scale(1)';
                            card.style.opacity = '1';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.2 });

        this.sections.forEach(section => {
            observer.observe(section);
            
            // Préparer les cartes
            const cards = section.querySelectorAll('.tool-card, .team-card');
            cards.forEach(card => {
                card.style.transform = 'translateY(50px) scale(0.9)';
                card.style.opacity = '0';
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }
}

// =========================
// Texte animé
// =========================
class TextAnimator {
    constructor() {
        this.title = document.querySelector('.hero-title');
        this.init();
    }

    init() {
        if (!this.title) return;
        
        const letters = this.title.innerText.split('');
        this.title.innerHTML = letters.map((letter, i) => 
            `<span class="letter" style="animation-delay: ${i * 0.05}s">${letter}</span>`
        ).join('');
    }
}

// =========================
// Année dynamique
// =========================
document.getElementById('currentYear').textContent = new Date().getFullYear();

// =========================
// Tooltips
// =========================
class TooltipManager {
    constructor() {
        this.tooltips = document.querySelectorAll('[data-tooltip]');
        this.init();
    }

    init() {
        this.tooltips.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = e.target.dataset.tooltip;
                document.body.appendChild(tooltip);
                
                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
                tooltip.style.top = `${rect.bottom + 10}px`;
                
                e.target.addEventListener('mouseleave', () => {
                    tooltip.remove();
                });
            });
        });
    }
}

// =========================
// Initialisation
// =========================
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
    new ParticleSystem();
    new ScrollAnimations();
    new TextAnimator();
    new TooltipManager();
    
    // Effet de parallaxe
    document.addEventListener('mousemove', (e) => {
        const elements = document.querySelectorAll('.floating-element');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        elements.forEach((el, i) => {
            const speed = (i + 1) * 20;
            const x = (mouseX * speed) - speed / 2;
            const y = (mouseY * speed) - speed / 2;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Animation des stats
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const value = stat.textContent;
        if (!isNaN(value)) {
            let current = 0;
            const target = parseInt(value);
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        }
    });
});
