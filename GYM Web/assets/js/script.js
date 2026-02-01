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

/*=============== HOME TITLE ===============*/
const homeTitle = document.querySelector('.home-title');
const text = homeTitle.getAttribute('data-text');
homeTitle.textContent = text;

/*=============== STATIC STATS DISPLAY ===============*/
function setStaticStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        stat.textContent = target;
    });
}

setStaticStats();

/*=============== MOUSE FOLLOWER EFFECT ===============*/
const cursor = document.createElement('div');
cursor.className = 'mouse-follower';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
}, true);

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
}, true);

document.addEventListener('click', (e) => {
    cursor.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cursor.style.transform = 'scale(1)';
    }, 200);

    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

/*=============== INTERSECTION OBSERVER FOR ANIMATIONS ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.home-data, .home-image-container, .home-stats').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

/*=============== EQUIPMENT SLIDER FUNCTIONALITY ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    let autoSlideInterval;

    // Function to update active slide
    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Move slider
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Function to go to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
    }

    // Function to go to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Function to go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlides();
    }

    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto slide after manual interaction
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto slide after manual interaction
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Restart auto slide after manual interaction
        });
    });

    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Initialize slider
    updateSlides();
    startAutoSlide();
});

/*=============== BMI CALCULATOR FUNCTIONALITY ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const resultDiv = document.getElementById('result');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const height = parseFloat(heightInput.value) / 100; // Convert cm to meters
            const weight = parseFloat(weightInput.value);

            if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                alert('Please enter valid height and weight values.');
                return;
            }

            const bmi = (weight / (height * height)).toFixed(1);

            let category;
            if (bmi < 18.5) {
                category = 'Underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                category = 'Normal weight';
            } else if (bmi >= 25 && bmi < 30) {
                category = 'Overweight';
            } else {
                category = 'Obese';
            }

            bmiValue.textContent = bmi;
            bmiCategory.textContent = category;
            resultDiv.classList.add('show');
        });
    }
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);



/*=============== SCROLL TO TOP BUTTON ===============*/
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*=============== MOBILE NAV TOGGLE ===============*/
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const navClose = document.querySelector('.nav-close');

if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        navList.classList.add('show');
    });
}

if (navClose && navList) {
    navClose.addEventListener('click', () => {
        navList.classList.remove('show');
    });
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('show');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('show');
    }
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');
const headerHeight = header ? header.offsetHeight : 0;

function scrollActive() {
    const scrollY = window.pageYOffset;
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-link'));

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - headerHeight;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav-link[href*=' + sectionId + ']');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight && navLink) {
            navLink.classList.add('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);
