document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');
    
    function highlightNavOnScroll() {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Typing animation with improved error handling
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    
 const textArray = ["Web Developer", "App Developer", "UI/UX Designer", "Flutter Developer"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (typedTextSpan && charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }
        
    function erase() {
        if (typedTextSpan && charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if (typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }

    
    // Project filtering with animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // First remove the active class to reset animations
                card.classList.remove('active');
                
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    // Show the card
                    card.style.display = 'block';
                    // Add a small delay before adding the active class for animation
                    setTimeout(() => {
                        card.classList.add('active');
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Form submission with validation
    const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            formStatus.innerHTML = '<p class="error">Please fill in all fields.</p>';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.innerHTML = '<p class="error">Please enter a valid email address.</p>';
            return;
        }

        // Send form data to Formspree
        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.innerHTML = '<p class="success">Your message has been sent! I\'ll get back to you soon.</p>';
                contactForm.reset();
            } else {
                const result = await response.json();
                if (result.errors) {
                    formStatus.innerHTML = `<p class="error">${result.errors.map(e => e.message).join(", ")}</p>`;
                } else {
                    formStatus.innerHTML = '<p class="error">Oops! Something went wrong.</p>';
                }
            }
        } catch (error) {
            formStatus.innerHTML = '<p class="error">Network error. Please try again later.</p>';
        }

        setTimeout(() => {
            formStatus.innerHTML = '';
        }, 5000);
    });

    }
    
    // Back to top button with smooth scroll
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                scrollToTopBtn.style.display = 'flex';
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
                setTimeout(() => {
                    if (!scrollToTopBtn.classList.contains('active')) {
                        scrollToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Theme toggle with animation
    const themeToggleBtn = document.getElementById('toggleBtn');
    const root = document.documentElement;
    const themeImage = document.getElementById('themeImage');
    
    // Get the saved theme and direction
    let currentTheme = localStorage.getItem('theme') || 'light';
    let transitionDirection = localStorage.getItem('transitionDirection') || 'ltr';
    
    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        root.classList.add('dark');
        if (themeToggleBtn) themeToggleBtn.textContent = '🌞';
        if (themeImage) themeImage.src = 'images/dark1.png';
    } else {
        if (themeToggleBtn) themeToggleBtn.textContent = '🌚';
        if (themeImage) themeImage.src = 'images/dark1.png';
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Toggle dark mode class
            root.classList.toggle('dark');
            
            // Determine the next theme based on current state
            const isDark = root.classList.contains('dark');
            const nextTheme = isDark ? 'dark' : 'light';
            
            // Apply transition animation
            root.classList.add('theme-transition');
            root.classList.add(`transition-${transitionDirection}`);
            
            // Update toggle button text
            themeToggleBtn.textContent = isDark ? '🌞' : '🌚';
            
            // Update theme image if it exists
            if (themeImage) {
                themeImage.src = isDark ? 'images/dark1.png' : 'images/dark1.png';
            }
            
            // Remove transition classes after animation completes
            setTimeout(() => {
                root.classList.remove('theme-transition');
                root.classList.remove(`transition-${transitionDirection}`);
                
                // Toggle the direction for next time
                transitionDirection = transitionDirection === 'ltr' ? 'rtl' : 'ltr';
                localStorage.setItem('transitionDirection', transitionDirection);
            }, 1000);
            
            // Save preference to localStorage
            localStorage.setItem('theme', nextTheme);
        });
    }
    
    // Fixed scroll animations - track elements that have not yet been animated
    const animatedElements = new Set();
    
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in, .skill-item, .project-card, .stat-item, .section-title, .form-group');
        
        elements.forEach(element => {
            // Skip elements that are already being tracked
            if (animatedElements.has(element)) {
                return;
            }
            
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
                
                // Add to set so we know this element has been animated
                animatedElements.add(element);
                
                // After animation completes, remove from set to allow re-animation
                // when element goes out of view and comes back
                setTimeout(() => {
                    // Setup intersection observer to detect when element leaves viewport
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (!entry.isIntersecting) {
                                // Element is out of view, remove active class and from tracking set
                                element.classList.remove('active');
                                animatedElements.delete(element);
                                observer.unobserve(element);
                            }
                        });
                    }, { threshold: 1.0 }); // 10% visibility threshold
                    
                    observer.observe(element);
                }, 1000); // Wait for animation to complete before setting up observer
            }
        });
    }
    
    // Run once on page load
    handleScrollAnimations();
    
    // Run on scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Simple parallax effect for hero section
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            if (scrollValue < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrollValue * 0.2}px)`;
            }
        });
    }
});
