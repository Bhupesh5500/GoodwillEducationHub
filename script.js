// Smooth scroll to services section
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const mobileDropdown = document.getElementById('mobile-dropdown');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    mobileDropdown.addEventListener('change', (e) => {
        const selectedValue = e.target.value; 
        if (selectedValue) {
            window.location.href = selectedValue;
            mobileDropdown.value = ""; // Reset dropdown to default option
        }
    });

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
            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Add highlight effect if it's the contact section
            if (targetId === '#contact-section') {
                // Remove existing highlight if any
                targetElement.classList.remove('highlight');
                
                // Trigger reflow
                void targetElement.offsetWidth;
                
                // Add highlight class
                targetElement.classList.add('highlight');
                
                // Remove highlight class after animation
                setTimeout(() => {
                    targetElement.classList.remove('highlight');
                }, 2000);
            }
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

    document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
        document.getElementById('nav-links').classList.toggle('active');
    });

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

    setInterval(nextSlide, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
        document.getElementById('nav-links').classList.toggle('active');
    });
});

// Add this function to your existing script.js
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

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE },
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