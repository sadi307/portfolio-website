// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const typingText = document.querySelector('.typing-text');

// 1. Mobile Menu Toggle
if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when a link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if(icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// 2. Typing Effect (Fixed)
if (typingText) {
    const words = ["| Designer", "| Freelancer", "& Creator"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 150; 

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; 
        } else {
            typeSpeed = isDeleting ? 100 : 150; 
        }

        setTimeout(type, typeSpeed);
    }
    document.addEventListener('DOMContentLoaded', type);
}

// 3. Scroll Active State
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

// 4. Form Submission Simulation
const form = document.querySelector('.contact-form');
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Message Sent!';
        btn.style.background = '#ff2e63';
        
        setTimeout(() => {
            form.reset();
            btn.textContent = originalText;
            btn.style.background = ''; 
        }, 3000);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".pub-card");
    const modal = document.getElementById("pubModal");
    const closeBtn = document.querySelector(".modal-close-btn");
    
    const modalTitle = document.getElementById("modalTitle");
    const modalTech = document.getElementById("modalTech");
    const modalBody = document.getElementById("modalBody");
    const modalBadge = document.getElementById("modalBadge");

    // Click handler to launch dynamic abstract popup
    cards.forEach(card => {
        const actionButton = card.querySelector(".btn-read-more");
        actionButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Avoid triggering duplicate parent bubbles
            
            // Extract parameters out of clicked HTML element
            const title = card.getAttribute("data-title");
            const tech = card.getAttribute("data-tech");
            const detailedText = card.getAttribute("data-extended");
            const fieldLabel = card.querySelector(".pub-badge").innerText;

            // Paint data fields inside modal elements
            modalTitle.innerText = title;
            modalTech.innerText = `Architecture: [ ${tech} ]`;
            modalBody.innerText = detailedText;
            modalBadge.innerText = fieldLabel;

            // Trigger animations
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });
    });

    // Close Modal via trigger button click
    closeBtn.addEventListener("click", closeModal);

    // Close Modal by clicking blurred translucent background
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close Modal with Escape keyboard hook
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".pub-card");
    const modal = document.getElementById("pubModal");
    const closeBtn = document.querySelector(".modal-close-btn");
    
    const modalTitle = document.getElementById("modalTitle");
    const modalTech = document.getElementById("modalTech");
    const modalBody = document.getElementById("modalBody");
    const modalBadge = document.getElementById("modalBadge");
    const modalPdfLink = document.getElementById("modalPdfLink"); // Target the new link element

    // Click handler to launch dynamic abstract popup
    cards.forEach(card => {
        const actionButton = card.querySelector(".btn-read-more");
        actionButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Avoid triggering duplicate parent bubbles
            
            // Extract parameters out of clicked HTML element
            const title = card.getAttribute("data-title");
            const tech = card.getAttribute("data-tech");
            const detailedText = card.getAttribute("data-extended");
            const pdfPath = card.getAttribute("data-pdf");
            const fieldLabel = card.querySelector(".pub-badge").innerText;

            // Paint data fields inside modal elements
            modalTitle.innerText = title;
            modalTech.innerText = `Architecture: [ ${tech} ]`;
            modalBody.innerText = detailedText;
            modalBadge.innerText = fieldLabel;

            // Handle the PDF button visibility and path injection
            if (pdfPath && pdfPath.trim() !== "#" && pdfPath.trim() !== "") {
                modalPdfLink.href = pdfPath;
                modalPdfLink.style.display = "inline-flex"; // Show button if PDF path exists
            } else {
                modalPdfLink.style.display = "none"; // Hide button if no file is provided
            }

            // Trigger animations
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });
    });

    // Close Modal via trigger button click
    closeBtn.addEventListener("click", closeModal);

    // Close Modal by clicking blurred translucent background
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close Modal with Escape keyboard hook
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const words = ["Full Stack Web Developer", "MERN Stack Engineer", "Deep Learning Researcher"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 100;
    const erasingDelay = 50;
    const newWordDelay = 2000; // Pause time when a full word finishes typing
    
    const typingTextSpan = document.querySelector(".typing-text");

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete character
            typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Type character
            typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Determine next state timeout sequence
        let currentDelay = isDeleting ? erasingDelay : typingDelay;

        if (!isDeleting && charIndex === currentWord.length) {
            // Word completed typing -> prepare to delete after pause
            currentDelay = newWordDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word completely erased -> cycle to the next word item
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            currentDelay = 500; // Small delay before typing the next phrase
        }

        setTimeout(type, currentDelay);
    }

    // Start loop initialization if element exists
    if(typingTextSpan) setTimeout(type, 1000);
});