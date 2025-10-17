document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
        });
    }
    

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            showNotification(`Thank you for subscribing with ${email}! You'll receive our latest travel deals soon.`, 'success');
            this.reset();
        });
    }
    // Advantages section scroll animation
function initAdvantagesAnimation() {
    const infoCards = document.querySelectorAll('.info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    infoCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
}

// Call this function in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    initAdvantagesAnimation();
    // ... your existing JavaScript code
});

    // Booking Modal Functionality
    const bookingModal = document.getElementById('bookingModal');
    const successModal = document.getElementById('successModal');
    const bookingForm = document.getElementById('bookingForm');
    const closeModal = document.getElementById('closeModal');
    const closeSuccess = document.getElementById('closeSuccess');
    const resetForm = document.getElementById('resetForm');

    // Open booking modal
    const openBookingBtn = document.getElementById('openBookingBtn');
    if (openBookingBtn) {
        openBookingBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openBookingModal();
        });
    }
 

    // Open modal from "Book Now" buttons in destination cards
    document.querySelectorAll('.destination-actions .btn:not(.btn-outline)').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'tel:+919651107500';
            // openBookingModal();
        });
    });

    // Open modal from car "Call Now" buttons
    document.querySelectorAll('.call-car-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            openBookingModal();
        });
    });
    document.querySelectorAll('.learnMoreForm').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            openBookingModal();
        });
    });
 

    function openBookingModal() {
        if (bookingModal) {
            bookingModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modals
    if (closeModal) {
        closeModal.addEventListener('click', closeModals);
    }

    if (closeSuccess) {
        closeSuccess.addEventListener('click', closeModals);
    }

    function closeModals() {
        if (bookingModal) bookingModal.style.display = 'none';
        if (successModal) successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close modals when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === bookingModal || e.target === successModal) {
            closeModals();
        }
    });

    // Reset form
    if (resetForm) {
        resetForm.addEventListener('click', function () {
            if (bookingForm) bookingForm.reset();
        });
    }

    // Date validation
    const today = new Date().toISOString().split('T')[0];
    const departureDateEl = document.getElementById('departureDate');
    const returnDateEl = document.getElementById('returnDate');
    
    if (departureDateEl) departureDateEl.min = today;
    if (returnDateEl) returnDateEl.min = today;
    
    if (departureDateEl && returnDateEl) {
        departureDateEl.addEventListener('change', function () {
            returnDateEl.min = this.value;
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .car-card, .destination-card, .testimonial-card, .info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });

    // WhatsApp submission function
    function sendToWhatsApp(formData) {
        const phoneNumber = '919651107500';
        const message = `🚗 *New Booking Request - BanarasExpress Cabs* 🚗

👤 *Name:* ${formData.fullName}
📞 *Phone:* ${formData.phone}
📍 *Pickup Location:* ${formData.pickupLocation}
🎯 *Destination:* ${formData.destination}
📅 *Departure Date:* ${formData.departureDate}
📅 *Return Date:* ${formData.returnDate || 'Not specified'}
💬 *Special Requests:* ${formData.specialRequests || 'None'}

_Thank you for choosing BanarasExpress Cabs!_`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }

    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const formData = {
                fullName: document.getElementById('fullName')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                pickupLocation: document.getElementById('pickupLocationModal')?.value || '',
                destination: document.getElementById('destinationModal')?.value || '',
                departureDate: departureDateEl?.value || '',
                returnDate: returnDateEl?.value || '',
                specialRequests: document.getElementById('specialRequests')?.value || ''
            };

            // Validate required fields
            if (!formData.fullName || !formData.phone || !formData.pickupLocation || !formData.destination) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            sendToWhatsApp(formData);
            closeModals();
            showNotification('Booking request sent successfully! We will contact you shortly.', 'success');
        });
    }

    // Notification function
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#48bb78' : '#e53e3e'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Add CSS for notification
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(notificationStyles);

    // Destination card interactions
    document.querySelectorAll('.destination-card .btn-outline').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.destination-card');
            const title = card.querySelector('h3').textContent;
            showNotification(`More details about ${title} coming soon!`, 'info');
        });
    });

    // Initialize animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .car-card, .destination-card, .testimonial-card');
        
        animatedElements.forEach((element, index) => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    initScrollAnimations();

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease';
        });
        
        // Set initial state
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
        }
    });
});