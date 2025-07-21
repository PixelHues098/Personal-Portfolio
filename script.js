    /*========== toggle icon navigation bar ==========*/
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x')
        navbar.classList.toggle('active')

    };

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    /*========== sticky navbar ==========*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*========== remove toggle icon and navbar when click navbar link (scroll) ==========*/
    menuIcon.classList.remove('bx-x')
    navbar.classList.remove('active')
};

/*========== scroll reveal ==========*/
ScrollReveal({
    reset: true,
    distance:'80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


/*========== scroll reveal ==========*/
const typed = new Typed('.multiple-text', {
    strings: ['Web Developer', 'IT/CS Instructor', 'Visual Artist'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/*========== smtp email sender ==========*/
var btn = document.getElementById('btn');
btn.addEventListener('click', function(e) {
    e.preventDefault();
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var subjectInput = document.getElementById('subject');
    var messageInput = document.getElementById('message');
    
    // Clear the input fields
    nameInput.value = '';
    emailInput.value = '';
    subjectInput.value = '';
    messageInput.value = '';

    var name = nameInput.value;
    var email = emailInput.value;
    var subject = subjectInput.value;
    var message = messageInput.value;
    var body = 'name: ' + name + '<br/> email: ' + email + '<br/> subject: ' + subject + '<br/> message: ' + message;

    Email.send({
        SecureToken: "18f8c89d-dbbc-458d-8f41-289bddc24928",
        To: 'nickoalbes@gmail.com',
        From: "mobiemocken0978@gmail.com",
        Subject: "Contact Message",
        Body: body
    }).then(
        message => alert(message)
    );
});
