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
