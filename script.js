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
        const destinationLat = 26.6645291169659;
        const destinationLng = 87.5962672804697;

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
                    const directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&travelmode=driving`;
                    window.open(directionsURL, '_blank');
                }
            );
        } else {
            alert("Geolocation is not supported by your browser. Please use Google Maps directly.");
            const mapsURL = `https://www.google.com/maps/search/?api=1&query=${destinationLat},${destinationLng}`;
            window.open(mapsURL, '_blank');
        }
    }

    // Initialize Google Map
    function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE }, // Replace with actual latitude/longitude
            zoom: 12,
            scrollwheel: true,
            zoomControl: true,
            fullscreenControl: true
        });
    
        // Make map responsive
        google.maps.event.addDomListener(window, 'resize', function() {
            const center = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
        });
    }
});
