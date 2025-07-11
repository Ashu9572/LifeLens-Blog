document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const navMenu = document.querySelector('.nav-menu');

  mobileMenuButton.addEventListener('click', () => {
    // Toggle the .active class on nav-menu
    navMenu.classList.toggle('active');

    // Update aria-expanded for accessibility
    const isExpanded = navMenu.classList.contains('active');
    mobileMenuButton.setAttribute('aria-expanded', isExpanded);

    // Optional: Change button icon (e.g., hamburger to close)
    mobileMenuButton.textContent = isExpanded ? '✕' : '☰';
  });

  // Handle dropdowns within the mobile menu
  const dropdownToggles = document.querySelectorAll('.has-dropdown .nav-link');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // Prevent default link behavior on mobile
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = toggle.parentElement;
        parent.classList.toggle('active');
      }
    });
  });

  // Close menu when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !navMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
      navMenu.classList.remove('active');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton.textContent = '☰';
    }
  });
});

// Hero Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.pagination-dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const heroSection = document.querySelector('.hero');
    
    let currentSlide = 0;
    let interval;
    let isPaused = false;
    
    // Initialize autoplay
    startAutoplay();
    
    // Function to start autoplay
    function startAutoplay() {
        if (!isPaused) {
            interval = setInterval(() => {
                goToSlide((currentSlide + 1) % slides.length);
            }, 5000); // Change slide every 5 seconds
        }
    }
    
    // Function to stop autoplay
    function stopAutoplay() {
        clearInterval(interval);
    }
    
    // Go to specified slide
    function goToSlide(slideIndex) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = slideIndex;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Event listeners for pagination dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });
    
    // Event listeners for prev/next buttons
    prevBtn.addEventListener('click', () => {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
        stopAutoplay();
        startAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide((currentSlide + 1) % slides.length);
        stopAutoplay();
        startAutoplay();
    });
    
    // Pause autoplay when mouse enters the hero section or interactive elements
    heroSection.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoplay();
    });
    
    // Resume autoplay when mouse leaves the hero section
    heroSection.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoplay();
    });
    
    // Additional pause for buttons
    const buttons = heroSection.querySelectorAll('button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            isPaused = true;
            stopAutoplay();
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchInput = document.querySelector('.search-input');
    const searchBar = document.querySelector('.search-bar');
    const searchResults = document.getElementById('searchResults');
    const searchResultsList = document.getElementById('searchResultsList');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchLoading = document.getElementById('searchLoading');
    const resultsCount = document.getElementById('resultsCount');
    
    // Add search icon
    if (!document.querySelector('.search-icon')) {
        const searchIcon = document.createElement('span');
        searchIcon.classList.add('search-icon');
        searchIcon.innerHTML = '🔍';
        searchBar.appendChild(searchIcon);
    }
    
    // Sample indexed content from the page
    // In a real implementation, this would be your actual blog content
    const blogContent = [
        {
            id: 'hero-1',
            category: 'Featured',
            title: 'See Life Through a Different Lens',
            content: 'Explore perspectives that challenge, inspire, and transform your understanding of the world around you.',
            url: '#'
        },
        {
            id: 'hero-2',
            category: 'Featured',
            title: 'Wellness Redefined',
            content: 'Discover holistic approaches to health that balance mind, body, and spirit for a more fulfilled life.',
            url: '#wellness'
        },
        {
            id: 'hero-3',
            category: 'Featured',
            title: 'Technology With Purpose',
            content: 'Understand the innovations shaping our future and how they can serve humanity\'s greatest needs.',
            url: '#tech'
        },
        {
            id: 'hero-4',
            category: 'Featured',
            title: 'The Culture of Cuisine',
            content: 'Delve into the stories behind global food traditions and how they connect us across borders and generations.',
            url: '#food'
        },
        {
            id: 'hero-5',
            category: 'Featured',
            title: 'Nature\'s Wisdom',
            content: 'Reconnect with the natural world and learn from its ancient patterns and resilient ecosystems.',
            url: '#nature'
        },
        {
            id: 'post-1',
            category: 'Travel',
            title: 'Rediscovering Ancient Paths: A Journey Through the Himalayas',
            content: 'Experience the majesty and spiritual depth of the world\'s highest mountains through a different perspective.',
            url: '#travel-post-1'
        },
        {
            id: 'post-2',
            category: 'Wellness',
            title: 'The Forgotten Art of Deep Listening: Healing in a Noisy World',
            content: 'Discover how the ancient practice of attentive listening can transform your relationships and inner peace.',
            url: '#wellness-post-1'
        },
        {
            id: 'post-3',
            category: 'Technology',
            title: 'Beyond Screens: How Ambient Computing is Reshaping Our Homes',
            content: 'The future of technology isn\'t about what we see, but what seamlessly integrates into our daily lives.',
            url: '#tech-post-1'
        },
        {
            id: 'post-4',
            category: 'Food',
            title: 'The Revival of Heritage Grains: Taste, Health and Sustainability',
            content: 'Ancient varieties of wheat and grains are making a comeback, offering superior nutrition and flavor while supporting sustainable farming practices.',
            url: '#food-post-1'
        },
        {
            id: 'post-5',
            category: 'Mindfulness',
            title: 'Finding Flow: The Science Behind Losing Track of Time',
            content: 'Explore the psychological state of flow, where challenges meet skills perfectly, and discover how to cultivate more of these deeply satisfying moments.',
            url: '#mindfulness-post-1'
        },
        {
            id: 'post-6',
            category: 'Sustainability',
            title: 'Urban Forests: How Cities are Rethinking Green Spaces',
            content: 'The innovative approaches cities around the world are taking to integrate forests into urban landscapes, bringing nature back to concrete jungles.',
            url: '#sustainability-post-1'
        },
        {
            id: 'popular-1',
            category: 'Lifestyle',
            title: 'Digital Minimalism: Finding Focus in a Distracted World',
            content: 'How reducing your digital footprint can lead to greater productivity and mental well-being.',
            url: '#lifestyle-post-1'
        },
        {
            id: 'popular-2',
            category: 'Wellness',
            title: 'The New Science of Sleep: Quality Over Quantity',
            content: 'Recent research shows that sleep quality matters more than total hours. Learn how to optimize your sleep cycle.',
            url: '#sleep-post-1'
        },
        {
            id: 'popular-3',
            category: 'Photography',
            title: 'Slow Photography: Capturing Mindful Moments',
            content: 'In an age of instant snapshots, learn how taking your time with photography can lead to more meaningful images.',
            url: '#photography-post-1'
        },
        {
            id: 'popular-4',
            category: 'Food',
            title: 'Hyperlocal Cuisine: Eating From Your Neighborhood',
            content: 'The growing movement of sourcing ingredients from within walking distance of your kitchen.',
            url: '#food-post-2'
        }
    ];
    
    // Search function
    function performSearch(query) {
        // Show loading
        searchLoading.style.display = 'block';
        searchResultsList.innerHTML = '';
        
        // Simulate search delay (would be real search in production)
        setTimeout(() => {
            if (!query.trim()) {
                searchResults.classList.remove('active');
                return;
            }
            
            const results = blogContent.filter(item => {
                return (
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.content.toLowerCase().includes(query.toLowerCase()) ||
                    item.category.toLowerCase().includes(query.toLowerCase())
                );
            });
            
            // Hide loading
            searchLoading.style.display = 'none';
            
            // Update results count
            if (results.length === 1) {
                resultsCount.textContent = '1 Result';
            } else {
                resultsCount.textContent = `${results.length} Results`;
            }
            
            // Display results
            if (results.length > 0) {
                results.forEach(result => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('search-result-item');
                    
                    // Highlight matching text
                    const highlightTitle = highlightText(result.title, query);
                    const highlightContent = highlightText(result.content, query);
                    
                    listItem.innerHTML = `
                        <span class="search-result-category">${result.category}</span>
                        <h4 class="search-result-title">${highlightTitle}</h4>
                        <p class="search-result-snippet">${highlightContent}</p>
                    `;
                    
                    // Click event for the search result
                    listItem.addEventListener('click', () => {
                        window.location.href = result.url;
                        searchResults.classList.remove('active');
                    });
                    
                    searchResultsList.appendChild(listItem);
                });
            } else {
                searchResultsList.innerHTML = `<div class="no-results">No results found for "${query}"</div>`;
            }
            
            // Show results container
            searchResults.classList.add('active');
        }, 500); // Simulated search delay
    }
    
    // Highlight matching text
    function highlightText(text, query) {
        if (!query.trim()) return text;
        
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }
    
    // Helper to escape special RegExp characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Event listeners
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            searchResults.classList.remove('active');
            return;
        }
        
        const query = this.value.trim();
        if (query.length >= 2) {
            performSearch(query);
        } else {
            searchResults.classList.remove('active');
        }
    });
    
    // Focus event to open results if there's already a query
    searchInput.addEventListener('focus', function() {
        const query = this.value.trim();
        if (query.length >= 2) {
            performSearch(query);
        }
    });
    
    // Close search results
    closeSearchBtn.addEventListener('click', function() {
        searchResults.classList.remove('active');
    });
    
    // Close results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchResults.contains(e.target) && 
            !searchInput.contains(e.target) && 
            !e.target.classList.contains('search-icon')) {
            searchResults.classList.remove('active');
        }
    });
    
    // Search icon click
    const searchIconElement = document.querySelector('.search-icon');
    if (searchIconElement) {
        searchIconElement.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                performSearch(query);
            } else {
                searchInput.focus();
            }
        });
    }
});

// Toggle dropdown menus
        document.addEventListener("DOMContentLoaded", function() {
            const dropdownToggles = document.querySelectorAll(".has-dropdown .nav-link");
            
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener("click", function(e) {
                    e.preventDefault();
                    
                    // Close all other dropdowns
                    const allDropdowns = document.querySelectorAll(".has-dropdown");
                    allDropdowns.forEach(item => {
                        if (item !== this.parentElement) {
                            item.classList.remove("active");
                            item.querySelector(".dropdown").classList.remove("active");
                        }
                    });
                    
                    // Toggle current dropdown
                    const parent = this.parentElement;
                    const dropdown = parent.querySelector(".dropdown");
                    parent.classList.toggle("active");
                    dropdown.classList.toggle("active");
                });
            });
            
            // Close dropdowns when clicking outside
            document.addEventListener("click", function(e) {
                if (!e.target.closest(".has-dropdown")) {
                    const allDropdowns = document.querySelectorAll(".has-dropdown");
                    allDropdowns.forEach(item => {
                        item.classList.remove("active");
                        item.querySelector(".dropdown").classList.remove("active");
                    });
                }
            });
            
            // Mobile menu toggle
            const mobileMenuButton = document.querySelector(".mobile-menu-button");
            const navMenu = document.querySelector(".nav-menu");
            
            mobileMenuButton.addEventListener("click", function() {
                navMenu.classList.toggle("active");
            });
        });
