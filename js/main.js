document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. SCROLL FADE-IN ANIMATION (Intersection Observer)
    // -----------------------------------------------------------------
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to trigger the animation
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the section is visible
    });

    sections.forEach(section => {
        section.classList.add('animate-section-in'); // Apply initial hidden state
        observer.observe(section);
    });


    // Mobile Menu Toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuButton.querySelector('svg:first-child').classList.toggle('hidden');
        menuButton.querySelector('svg:last-child').classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuButton.querySelector('svg:first-child').classList.remove('hidden');
            menuButton.querySelector('svg:last-child').classList.add('hidden');
        });
    });


    // Achievements Chart.js
    const ctx = document.getElementById('achievementsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Capstone Project', 'Programming III'],
            datasets: [{
                label: 'Academic Score (%)',
                data: [84, 75],
                backgroundColor: [
                    'rgba(13, 148, 136, 0.7)', // teal-600
                    'rgba(51, 65, 85, 0.7)' // slate-700
                ],
                borderColor: [
                    'rgba(13, 148, 136, 1)',
                    'rgba(51, 65, 85, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#e5e7eb'
                    },
                    ticks: {
                        color: '#475569'
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#334155',
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#1e293b',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            return ` Score: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });


    // Modal Logic
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    const openModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('invisible', 'opacity-0');
            modal.querySelector('.modal-content').classList.remove('scale-95', 'opacity-0');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.querySelector('.modal-content').classList.add('scale-95', 'opacity-0');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('invisible');
                document.body.style.overflow = 'auto';
            }, 250);
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.modal);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(button.closest('.modal'));
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Add shine effect to buttons
    const buttons = document.querySelectorAll('a.relative.overflow-hidden');
    buttons.forEach(button => {
        const shine = document.createElement('div');
        shine.classList.add('shine-effect');
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '-100%';
        shine.style.width = '100%';
        shine.style.height = '100%';
        button.appendChild(shine);
    });

    // Text Cycling Animation
    const jobTitle = document.querySelector('.text-shine-effect');
    const wordsToCycle = ["Application", "Web"];
    let wordIndex = 0;
    const baseText = "Junior ";
    const endText = " Developer.";
    const typingSpeed = 100; // ms per character
    const backspaceSpeed = 60; // ms per character
    const delayBetweenWords = 2500; // ms

    function typeWriterEffect() {
        let currentWord = wordsToCycle[wordIndex];
        let nextWord = wordsToCycle[(wordIndex + 1) % wordsToCycle.length];

        // Backspace the current word
        let i = currentWord.length;
        let backspaceInterval = setInterval(() => {
            jobTitle.textContent = baseText + currentWord.substring(0, i) + endText;
            i--;
            if (i < 0) {
                clearInterval(backspaceInterval);
                // Type the next word
                wordIndex = (wordIndex + 1) % wordsToCycle.length;
                let j = 0;
                let typeInterval = setInterval(() => {
                    jobTitle.textContent = baseText + nextWord.substring(0, j + 1) + endText;
                    j++;
                    if (j >= nextWord.length) {
                        clearInterval(typeInterval);
                        // Wait before starting the next cycle
                        setTimeout(typeWriterEffect, delayBetweenWords);
                    }
                }, typingSpeed);
            }
        }, backspaceSpeed);
    }

    // Initialize the text and start the animation after a short delay
    jobTitle.textContent = baseText + wordsToCycle[0] + endText;
    setTimeout(typeWriterEffect, delayBetweenWords);


});