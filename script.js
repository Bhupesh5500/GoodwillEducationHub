document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to services section
    function scrollToServices() {
        document.getElementById('services').scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Get the mobile menu toggle button and nav links
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Prevent menu from closing when clicking inside nav-links
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Smooth scroll for internal navigation links (anchor links)
    document.querySelectorAll('a[href^="#"], select.mobile-dropdown').forEach(element => {
        if (element.tagName === 'SELECT') {
            element.addEventListener('change', function(e) {
                const targetId = this.value;
                handleScroll(targetId);
            });
        } else {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                handleScroll(targetId);
            });
        }
    });

    function handleScroll(targetId) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Handle direct links to contact section (e.g., from other pages)
    if (window.location.hash === '#contact-section') {
        const contactSection = document.querySelector('#contact-section');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                contactSection.classList.add('highlight');
                setTimeout(() => {
                    contactSection.classList.remove('highlight');
                }, 2000);
            }, 500);
        }
    }

    // Hero slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slider .slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        const slider = document.querySelector('.hero-slider');
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 3000); // Changed to 3000ms for better user experience

    // Geolocation and Directions to a specific location
    function getDirections() {
        const destinationLat = 26.664364200662238; // Updated latitude
        const destinationLng = 87.6012096181491; // Updated longitude

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    const directionsURL = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
                    window.open(directionsURL, '_blank');
                },
                (error) => {
                    console.error("Error getting location:", error);
                    const fallbackURL = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&travelmode=driving`;
                    window.open(fallbackURL, '_blank');
                }
            );
        } else {
            alert("Geolocation is not supported by your browser. Please use Google Maps directly.");
            const fallbackURL = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&travelmode=driving`;
            window.open(fallbackURL, '_blank');
        }
    }

    // Attach the function to the button
    document.querySelector('.directions-btn').addEventListener('click', getDirections);

    // Initialize Google Map with iframe
    function initMap() {
        const iframe = document.createElement('iframe');
        iframe.width = '600';
        iframe.height = '450';
        iframe.style.border = '0';
        iframe.loading = 'lazy';
        iframe.referrerpolicy = 'no-referrer-when-downgrade';
        iframe.src = `https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d169.45428380542495!2d87.6012096181491!3d26.664364200662238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d26.664337399999997!2d87.60127229999999!4m3!3m2!1d26.6392439!2d87.7228485!5e1!3m2!1sen!2snp!4v1743236881865!5m2!1sen!2snp`; // Updated iframe URL

        const mapContainer = document.getElementById('map');
        mapContainer.innerHTML = ''; // Clear any previous map
        mapContainer.appendChild(iframe);
    }

    // Call initMap to load the iframe map when the page is ready
    initMap();
}); 
function updateTime() {
    const now = new Date();
  
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    hours = hours.toString().padStart(2, '0');
  
    const timeString = `${hours}:${minutes} ${seconds} ${ampm}`;
  
    document.getElementById('time').textContent = timeString;
  }
  
  setInterval(updateTime, 1000);
  updateTime(); // Initial call
  