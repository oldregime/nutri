// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    // Who I Serve dropdown functionality
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const whoIServe = document.querySelector('.who-i-serve');

    if (dropdownToggle && whoIServe) {
        // Ensure it starts collapsed
        whoIServe.classList.add('collapsed');
        whoIServe.classList.remove('expanded');

        dropdownToggle.addEventListener('click', function() {
            // Toggle classes
            if (whoIServe.classList.contains('collapsed')) {
                whoIServe.classList.remove('collapsed');
                whoIServe.classList.add('expanded');
                dropdownToggle.classList.add('active');
            } else {
                whoIServe.classList.add('collapsed');
                whoIServe.classList.remove('expanded');
                dropdownToggle.classList.remove('active');
            }
        });
    }

    const appointmentForm = document.getElementById('appointment-form');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            // Don't prevent default as we want the form to submit to Web3Forms
            // But we still want to validate before submission

            // Basic form validation
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const gender = document.getElementById('gender').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const problem = document.getElementById('problem').value;
            const preferredDate = document.getElementById('preferred-date').value;
            const preferredTime = document.getElementById('preferred-time').value;

            // Check if required fields are filled
            if (!name || !age || !gender || !email || !phone || !problem || !preferredDate || !preferredTime) {
                e.preventDefault(); // Prevent form submission if validation fails
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }

            // Age validation
            if (age < 1 || age > 120) {
                e.preventDefault();
                alert('Please enter a valid age between 1 and 120.');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                e.preventDefault();
                alert('Please enter a valid 10-digit phone number.');
                return;
            }

            // Payment proof validation
            const paymentFile = document.getElementById('payment-proof').files[0];

            if (!paymentFile) {
                e.preventDefault();
                alert('Please upload payment proof to proceed.');
                return;
            }

            // If validation passes, the form will submit to Web3Forms
            // Web3Forms will handle the data and redirect to the thank you page

            // Log for debugging
            console.log('Form validated and submitting to Web3Forms');
        });
    }

    // Add form validation for payment proof
    document.getElementById('appointment-form').addEventListener('submit', function(e) {
        const paymentProof = document.getElementById('payment-proof');
        
        if (!paymentProof.files || paymentProof.files.length === 0) {
            e.preventDefault();
            alert('Please upload payment proof to proceed.');
            return;
        }

        // Check file size (max 10MB)
        if (paymentProof.files[0].size > 10 * 1024 * 1024) {
            e.preventDefault();
            alert('File size should be less than 10MB');
            return;
        }

        // Check file type - allow images and PDFs
        const validTypes = [
            'image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp',
            'application/pdf'
        ];
        
        if (!validTypes.includes(paymentProof.files[0].type)) {
            e.preventDefault();
            alert('Please upload a valid file (JPG, PNG, GIF, PDF)');
            return;
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .hero a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#')) {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add smooth scroll for footer links
    const footerLinks = document.querySelectorAll('.footer-links a');

    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#')) {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle the clicked FAQ item
            faqItem.classList.toggle('active');
        });
    });

    // Services tabs functionality
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceContents = document.querySelectorAll('.service-content');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            serviceTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all content sections
            serviceContents.forEach(content => content.classList.remove('active'));

            // Show the corresponding content section
            const serviceId = tab.getAttribute('data-service');
            document.getElementById(serviceId).classList.add('active');

            // Add a small animation to the icon
            const icon = tab.querySelector('i');
            icon.classList.add('fa-bounce');
            setTimeout(() => {
                icon.classList.remove('fa-bounce');
            }, 500);
        });
    });

    // Update copyright year
    function updateCopyright() {
        const currentYear = new Date().getFullYear();
        const copyrightElement = document.querySelector('.footer-copyright p');
        
        if (copyrightElement) {
            copyrightElement.innerHTML = `© ${currentYear} Nutritional Therapy by Dt. Shreya. All rights reserved.`;
        }
    }

    // Call the function when DOM loads
    document.addEventListener('DOMContentLoaded', updateCopyright);

    // Initialize FAQ items - open the first one by default
    const firstFaqItem = document.querySelector('.faq-item');
    if (firstFaqItem) {
        firstFaqItem.classList.add('active');
    }

    // Features slider functionality
    const featuresTrack = document.querySelector('.features-track');
    const sliderDots = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');

    if (featuresTrack) {
        const slides = featuresTrack.querySelectorAll('.feature-slide');
        let currentIndex = 0;
        const slidesToShow = Math.floor(featuresTrack.offsetWidth / 300);
        const maxIndex = Math.max(0, slides.length - slidesToShow);

        // Create dots
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }

        // Update dots
        function updateDots() {
            const dots = sliderDots.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Go to slide
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            const slideWidth = slides[0].offsetWidth + 20; // 20px is the gap
            featuresTrack.scrollLeft = currentIndex * slideWidth;
            updateDots();
        }

        // Previous slide
        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        // Next slide
        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        // Handle scroll events
        featuresTrack.addEventListener('scroll', () => {
            const slideWidth = slides[0].offsetWidth + 20;
            currentIndex = Math.round(featuresTrack.scrollLeft / slideWidth);
            updateDots();
        });

        // Initialize
        goToSlide(0);
    }

    // Animate thank you message on scroll
    function handleThankYouMessage() {
        const thankYouMessage = document.querySelector('.thank-you-message');
        if (thankYouMessage) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        thankYouMessage.style.opacity = '1';
                        thankYouMessage.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(thankYouMessage);
        }
    }

    // Call the function when DOM loads
    document.addEventListener('DOMContentLoaded', handleThankYouMessage);

    // Add this function to your existing script
    function copyUPIId(event) {
        event.preventDefault();
        const upiId = "shreya022055@oksbi";
        navigator.clipboard.writeText(upiId).then(() => {
            // Show feedback
            const button = event.currentTarget;
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> UPI ID Copied!';
            button.style.background = '#4caf50';
            button.style.color = 'white';
            
            // Reset after 2 seconds
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '#f0fff4';
                button.style.color = '#3e8e41';
            }, 2000);
        });
    }

    // Add touch device detection
    document.addEventListener('DOMContentLoaded', function() {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
        if (isTouchDevice) {
            document.querySelector('.upi-link').style.display = 'none';
            document.querySelector('.upi-id-copy').style.display = 'flex';
        } else {
            document.querySelector('.upi-id-copy').style.display = 'none';
        }
    });
});
