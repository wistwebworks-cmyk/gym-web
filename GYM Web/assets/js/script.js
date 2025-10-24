/*=============== CHANGE BACKGROUND HEADER ===============*/
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
});

/*=============== MAGNETIC ATTRACTION FOR REGISTER NOW BUTTON ===============*/
const registerButton = document.querySelector('.button-pulse');

if (registerButton) {
    registerButton.addEventListener('mousemove', (e) => {
        const rect = registerButton.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(x * x + y * y);

        if (distance < 100) {
            const strength = (100 - distance) / 100;
            const moveX = x * strength * 0.1;
            const moveY = y * strength * 0.1;
            registerButton.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        } else {
            registerButton.style.transform = 'scale(1.05)';
        }
    });

    registerButton.addEventListener('mouseleave', () => {
        registerButton.style.transform = 'scale(1)';
    });
}

/*=============== PARTICLE EXPLOSION ON HOVER ===============*/
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 5 + 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    let posX = x;
    let posY = y;
    let opacity = 1;

    const animate = () => {
        posX += vx;
        posY += vy;
        opacity -= 0.02;

        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };

    animate();
}

if (registerButton) {
    registerButton.addEventListener('mouseenter', (e) => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createParticle(e.clientX, e.clientY);
            }, i * 50);
        }
    });
}

/*=============== SCROLL PROGRESS INDICATOR ===============*/
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
});
