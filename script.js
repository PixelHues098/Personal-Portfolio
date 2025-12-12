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
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Prepare email body
        const body = `
            <strong>Name:</strong> ${name}<br/>
            <strong>Email:</strong> ${email}<br/>
            <strong>Subject:</strong> ${subject}<br/>
            <strong>Message:</strong> ${message}
        `;
        
        // Send email using SMTP.js
        Email.send({
            SecureToken: "18f8c89d-dbbc-458d-8f41-289bddc24928",
            To: 'nickoalbes@gmail.com',
            From: "mobiemocken0978@gmail.com",
            Subject: `Portfolio Contact: ${subject}`,
            Body: body,
            IsHtml: true
        }).then(response => {
            if (response === 'OK') {
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showFormMessage('Failed to send message. Please try again.', 'error');
            }
        }).catch(error => {
            console.error('Email send error:', error);
            showFormMessage('Failed to send message. Please try again.', 'error');
        });
    });
}

function showFormMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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