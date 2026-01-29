function toggleFAQ(id) {
    const answer = document.getElementById(`answer-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    const item = answer.closest('.faq-item');

    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach((el, index) => {
        if (el.id !== `answer-${id}`) {
            el.classList.remove('active');
            document.getElementById(`icon-${index + 1}`).classList.remove('rotate');
            el.closest('.faq-item').classList.remove('active');
        }
    });

    // Toggle current FAQ
    answer.classList.toggle('active');
    icon.classList.toggle('rotate');
    item.classList.toggle('active');
}
// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Animate counters
            if (entry.target.classList.contains('counter')) {
                animateCounter(entry.target);
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll, .counter').forEach(el => {
    observer.observe(el);
});

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you! Your catalog download will begin shortly.');
    this.reset();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


  // Carousel scroll functionality
    const scrollContainer = document.getElementById('productScroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    // Scroll amount (adjust based on your product card width)
    const scrollAmount = 300;

    scrollLeftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Optional: Hide arrows at start/end
    function updateArrowVisibility() {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        // Hide left arrow if at start
        if (scrollContainer.scrollLeft <= 0) {
            scrollLeftBtn.style.opacity = '0.3';
            scrollLeftBtn.style.pointerEvents = 'none';
        } else {
            scrollLeftBtn.style.opacity = '1';
            scrollLeftBtn.style.pointerEvents = 'auto';
        }

        // Hide right arrow if at end
        if (scrollContainer.scrollLeft >= maxScroll - 5) {
            scrollRightBtn.style.opacity = '0.3';
            scrollRightBtn.style.pointerEvents = 'none';
        } else {
            scrollRightBtn.style.opacity = '1';
            scrollRightBtn.style.pointerEvents = 'auto';
        }
    }

    // Update arrow visibility on scroll
    scrollContainer.addEventListener('scroll', updateArrowVisibility);
    
    // Initial check
    updateArrowVisibility();