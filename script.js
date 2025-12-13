/*========== toggle icon navigation bar ==========*/
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*========== close mobile menu when clicking link ==========*/
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

/*========== scroll sections active link ==========*/
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
            });
        }
    });

    /*========== sticky navbar ==========*/
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

/*========== scroll reveal ==========*/
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.skill-category, .info-item', { 
    origin: 'bottom',
    interval: 200 
});

/*========== typed animation ==========*/
const typed = new Typed('.multiple-text', {
    strings: ['Software Developer', 'IT/CS Instructor', 'Visual Artist', 'Tech Enthusiast'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

/*========== skill icons hover effect ==========*/
const skillIcons = document.querySelectorAll('.skill-icon');
skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', (e) => {
        const tooltip = e.target.closest('.skill-icon').getAttribute('data-tooltip');
        if (tooltip) {
            e.target.closest('.skill-icon').setAttribute('title', tooltip);
        }
    });
});

/*========== update copyright year ==========*/
const currentYear = document.getElementById('current-year');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/*========== form validation and submission ==========*/
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Optional: Show "Sending..." message
        const submitBtn = this.querySelector('.submit-btn span');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        
        // The form will now submit to Formspree automatically
        // Formspree will handle everything
        
        // Reset button text after 3 seconds (in case of error)
        setTimeout(() => {
            submitBtn.textContent = originalText;
        }, 3000);
    });
    
    // Check if there's a success parameter in URL
    if (window.location.search.includes('success=true')) {
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
    }
}

function showFormMessage(message, type) {
    // Create message element if it doesn't exist
    let msgElement = document.getElementById('form-message');
    if (!msgElement) {
        msgElement = document.createElement('div');
        msgElement.id = 'form-message';
        msgElement.className = 'form-message';
        contactForm.appendChild(msgElement);
    }
    
    msgElement.textContent = message;
    msgElement.className = 'form-message ' + type;
    msgElement.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        msgElement.style.display = 'none';
    }, 5000);
}

/*========== smooth scrolling for anchor links ==========*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

/*========== portfolio item hover delay for smoother animation ==========*/
const portfolioItems = document.querySelectorAll('.portfolio-box');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transitionDelay = '0.1s';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transitionDelay = '0s';
    });
});

/*========== add CSS for missing Font Awesome icons ==========*/
const style = document.createElement('style');
style.textContent = `
    .fa-csharp:before {
        content: "C#";
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
    }
    
    .fa-golang:before {
        content: "Go";
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
    }
    
    .skill-icon:hover .fa-csharp:before,
    .skill-icon:hover .fa-golang:before {
        color: var(--bg-color) !important;
    }
`;
document.head.appendChild(style);