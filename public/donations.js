// Enhanced Academic Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupMobileNavigation();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupHeaderEffects();
    setupModalFunctionality();
    setupInteractiveElements();
    setupGalleryFilters();
    setupDonationFeatures();
}

// Mobile Navigation Toggle with Enhanced Animation
function setupMobileNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Enhanced hamburger animation
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                document.body.style.overflow = 'hidden';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Enhanced Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animations for grid items
                if (entry.target.classList.contains('gallery-item') || 
                    entry.target.classList.contains('impact-card') ||
                    entry.target.classList.contains('stat-card')) {
                    
                    const container = entry.target.parentElement;
                    const items = container.querySelectorAll('.gallery-item, .impact-card, .stat-card');
                    
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.fade-in, .gallery-item, .impact-card, .stat-card, .addition-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced Header Effects
function setupHeaderEffects() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', debounce(function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.borderBottom = '3px solid #8b4513';
            header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
            header.style.borderBottom = '3px solid #8b4513';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        }
        
        lastScrollY = currentScrollY;
    }, 10));
}



// Academic Form Validation
function validateAcademicForm(form) {
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(error => error.remove());
    form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));

    requiredFields.forEach(field => {
        const value = field.value.trim();
        
        if (!value) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.type === 'tel' && value && !isValidPhone(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        }
    });

    return isValid;
}

// Donation Form Validation
function validateDonationForm(form) {
    const isValid = validateAcademicForm(form);
    const amountField = document.getElementById('amount');
    const amount = parseInt(amountField.value);
    
    if (amount && amount < 100) {
        showFieldError(amountField, 'Minimum donation amount is ₹100');
        return false;
    }
    
    return isValid;
}

// Gallery Filtering System
function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach((item, index) => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Donation Features
function setupDonationFeatures() {
    // Amount button selection
    const amountButtons = document.querySelectorAll('.amount-btn');
    const amountInput = document.getElementById('amount');
    
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            amountButtons.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            if (this.classList.contains('custom')) {
                if (amountInput) {
                    amountInput.focus();
                    amountInput.value = '';
                }
            } else {
                const amount = this.dataset.amount;
                if (amountInput && amount) {
                    amountInput.value = amount;
                }
            }
        });
    });

    // Support level selection
    const supportLevels = document.querySelectorAll('.support-level');
    supportLevels.forEach(level => {
        level.addEventListener('click', function() {
            const amount = this.dataset.amount;
            if (amountInput && amount) {
                amountInput.value = amount;
                
                // Update amount buttons
                amountButtons.forEach(btn => {
                    btn.classList.remove('selected');
                    if (btn.dataset.amount === amount) {
                        btn.classList.add('selected');
                    }
                });
            }
            
            // Visual feedback
            supportLevels.forEach(l => l.style.borderColor = '#e9ecef');
            this.style.borderColor = '#8b4513';
        });
    });

    // Custom amount input handling
    if (amountInput) {
        amountInput.addEventListener('input', function() {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Check if amount matches a preset
            const currentAmount = this.value;
            amountButtons.forEach(btn => {
                if (btn.dataset.amount === currentAmount) {
                    btn.classList.add('selected');
                }
            });
        });
    }
}

// Enhanced Modal Functionality
function setupModalFunctionality() {
    const modal = document.getElementById('loginModal');
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeLoginModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeLoginModal();
        }
    });
}

// Gallery Item Interactions
function setupInteractiveElements() {
    // Gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            const title = this.querySelector('h3')?.textContent || 'Archive Item';
            showAcademicModal(title, category);
        });
    });

    // Enhanced card hover effects
    document.querySelectorAll('.impact-card, .recognition-card, .info-card, .access-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

 

// Academic Modal for Gallery Items
function showAcademicModal(title, category) {
    const modal = document.createElement('div');
    modal.className = 'academic-modal';
    modal.innerHTML = `
        <div class="academic-modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close-btn" onclick="closeAcademicModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="modal-placeholder">
                    <i class="fas fa-images"></i>
                    <h4>Archive Content</h4>
                    <p>This section would display high-resolution images, documents, or multimedia content related to <strong>${title}</strong>.</p>
                    <p><em>Category: ${category}</em></p>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="downloadContent('${title}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="btn btn-primary" onclick="shareContent('${title}')">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(26, 37, 47, 0.9);
        backdrop-filter: blur(5px);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 50);
}

function closeAcademicModal() {
    const modal = document.querySelector('.academic-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function downloadContent(title) {
    showNotification(`Download feature for "${title}" would be implemented here.`, 'info');
}

function shareContent(title) {
    if (navigator.share) {
        navigator.share({
            title: `BVP Archive: ${title}`,
            text: `Check out this content from Bharatiya Vidvat Parishat archives: ${title}`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        showNotification('Share functionality would be implemented here.', 'info');
    }
}

// Enhanced Form Validation
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    
    field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
    const color = getNotificationColor(type);
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Apply styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: color,
        color: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        zIndex: '3000',
        maxWidth: '400px',
        transform: 'translateX(450px)',
        transition: 'transform 0.3s ease',
        fontFamily: '"Crimson Text", serif'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    return colors[type] || colors.info;
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(450px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Modal Functions (Legacy Support)
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Enhanced Accessibility
function enhanceAccessibility() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = '';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 10px;
        background: #1a252f;
        color: white;
        padding: 8px 15px;
        text-decoration: none;
        z-index: 2000;
        border-radius: 4px;
        transition: top 0.3s ease;
        font-family: 'Crimson Text', serif;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '10px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Keyboard navigation enhancement
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add focus styles for keyboard navigation
    const focusStyles = document.createElement('style');
    focusStyles.textContent = `
        .keyboard-navigation *:focus {
            outline: 3px solid #8b4513 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(focusStyles);
}

// Search Functionality
// Search Functionality with Smooth Animations
function addAcademicSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'academic-search';
    searchContainer.innerHTML = `
        <div class="search-wrapper">
            <input type="text" placeholder="Search archives, publications, scholars..." 
                   id="academicSearch" class="search-input">
            <button type="button" class="search-btn">
                <i class="fas fa-search"></i>
            </button>
        </div>
    `;
    
    const searchStyles = `
        .academic-search {
            position: fixed;
            top: 50%;
            right: 30px;
            transform: translateY(-50%);
            z-index: 1000;
        }
        
        .search-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        
        .search-input {
            width: 0;
            padding: 10px 0;
            border: 2px solid #e9ecef;
            border-radius: 25px;
            font-family: 'Crimson Text', serif;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            outline: none;
            margin-right: 5px;
            overflow: hidden;
        }
        
        .search-input.expanded {
            width: 200px;
            padding: 10px 15px;
            opacity: 1;
        }
        
        .search-input:focus {
            border-color: #8b4513;
            box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
        }
        
        .search-btn {
            background: #8b4513;
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(139, 69, 19, 0.3);
            flex-shrink: 0;
        }
        
        .search-btn:hover {
            background: #a0522d;
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(139, 69, 19, 0.4);
        }
        
        .search-btn:active {
            transform: scale(0.95);
        }
        
        .search-btn i {
            font-size: 14px;
            transition: transform 0.3s ease;
        }
        
        .search-wrapper.active .search-btn i {
            transform: rotate(90deg);
        }
        
        @media (max-width: 768px) {
            .academic-search { 
                display: none; 
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = searchStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(searchContainer);
    
    // Add event listeners for animations
    const searchBtn = searchContainer.querySelector('.search-btn');
    const searchInput = searchContainer.querySelector('.search-input');
    const searchWrapper = searchContainer.querySelector('.search-wrapper');
    let isExpanded = false;
    
    // Toggle search on button click
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleSearch();
    });
    
    // Expand on hover
    searchWrapper.addEventListener('mouseenter', function() {
        if (!isExpanded) {
            expandSearch();
        }
    });
    
    // Collapse on mouse leave (only if input is empty and not focused)
    searchWrapper.addEventListener('mouseleave', function() {
        if (isExpanded && !searchInput.value && document.activeElement !== searchInput) {
            collapseSearch();
        }
    });
    
    // Keep expanded when input is focused
    searchInput.addEventListener('focus', function() {
        expandSearch();
    });
    
    // Collapse when input loses focus and is empty
    searchInput.addEventListener('blur', function() {
        if (!searchInput.value) {
            setTimeout(() => {
                if (!searchWrapper.matches(':hover')) {
                    collapseSearch();
                }
            }, 100);
        }
    });
    
    // Handle Enter key for search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performAcademicSearch();
        }
    });
    
    function expandSearch() {
        searchInput.classList.add('expanded');
        searchWrapper.classList.add('active');
        isExpanded = true;
    }
    
    function collapseSearch() {
        searchInput.classList.remove('expanded');
        searchWrapper.classList.remove('active');
        isExpanded = false;
    }
    
    function toggleSearch() {
        if (isExpanded) {
            if (searchInput.value) {
                performAcademicSearch();
            } else {
                collapseSearch();
            }
        } else {
            expandSearch();
            // Focus input after animation completes
            setTimeout(() => {
                searchInput.focus();
            }, 200);
        }
    }
}

// Search function (you can customize this based on your needs)
function performAcademicSearch() {
    const searchTerm = document.getElementById('academicSearch').value;
    if (searchTerm.trim()) {
        console.log('Searching for:', searchTerm);
        // Add your search logic here
        // For example: window.location.href = /search?q=${encodeURIComponent(searchTerm)};
        alert(`Searching for: ${searchTerm}`);
    }
}


// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current).toLocaleString() + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + '+';
            }
        };
        
        // Start animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Enhanced Form Features
function addFormEnhancements() {
    // Auto-save form data to prevent loss
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const formId = form.id;
        if (formId) {
            // Load saved data
            loadFormData(form, formId);
            
            // Save data on input
            form.addEventListener('input', debounce(() => {
                saveFormData(form, formId);
            }, 500));
        }
    });
    
    // Character count for textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        const maxLength = textarea.maxLength || 1000;
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #7f8c8d;
            margin-top: 5px;
        `;
        
        const updateCounter = () => {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${textarea.value.length}/${maxLength} characters`;
            counter.style.color = remaining < 50 ? '#e74c3c' : '#7f8c8d';
        };
        
        textarea.addEventListener('input', updateCounter);
        textarea.parentNode.appendChild(counter);
        updateCounter();
    });
}

// Form Data Persistence (in memory only)
const formDataStore = {};

function saveFormData(form, formId) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    formDataStore[formId] = data;
}

function loadFormData(form, formId) {
    const savedData = formDataStore[formId];
    if (savedData) {
        Object.keys(savedData).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field && field.type !== 'password') {
                field.value = savedData[key];
            }
        });
    }
}

// Advanced Search Features
function setupAdvancedSearch() {
    const searchInput = document.getElementById('academicSearch');
    if (searchInput) {
        // Add search suggestions
        const suggestions = [
            'Sanskrit manuscripts',
            'Vedic studies',
            'Ancient philosophy',
            'Traditional texts',
            'Research publications',
            'Scholar profiles',
            'Conference proceedings',
            'Digital archives'
        ];
        
        const suggestionBox = document.createElement('div');
        suggestionBox.className = 'search-suggestions';
        suggestionBox.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            max-height: 300px;
            overflow-y: auto;
            display: none;
            z-index: 1001;
        `;
        
        searchInput.parentNode.appendChild(suggestionBox);
        
        searchInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            if (value.length > 2) {
                const matches = suggestions.filter(s => 
                    s.toLowerCase().includes(value)
                );
                
                if (matches.length > 0) {
                    suggestionBox.innerHTML = matches.map(match => 
                        `<div class="suggestion-item" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f8f9fa;">${match}</div>`
                    ).join('');
                    suggestionBox.style.display = 'block';
                    
                    // Add click handlers
                    suggestionBox.querySelectorAll('.suggestion-item').forEach(item => {
                        item.addEventListener('click', () => {
                            searchInput.value = item.textContent;
                            suggestionBox.style.display = 'none';
                            performAcademicSearch();
                        });
                    });
                } else {
                    suggestionBox.style.display = 'none';
                }
            } else {
                suggestionBox.style.display = 'none';
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.parentNode.contains(e.target)) {
                suggestionBox.style.display = 'none';
            }
        });
    }
}

// Progressive Enhancement Features
function setupProgressiveEnhancements() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Service worker registration for offline capabilities
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully');
            })
            .catch(error => {
                console.log('Service Worker registration failed');
            });
    }
}

// Analytics and Performance Tracking
function setupAnalytics() {
    // Track page interactions for academic insights
    const trackingEvents = [
        { selector: '.gallery-item', event: 'click', category: 'Gallery' },
        { selector: '.impact-card', event: 'click', category: 'Impact' },
        { selector: '.donation-btn', event: 'click', category: 'Donation' }
    ];
    
    trackingEvents.forEach(({ selector, event, category }) => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener(event, () => {
                // Track interaction (would integrate with analytics service)
                console.log(`User interaction: ${category} - ${element.textContent?.slice(0, 50) || 'Element'}`);
            });
        });
    });
}

// Dark Mode Toggle
function setupDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.title = 'Toggle Dark Mode';
    
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #8b4513;
        color: white;
        border: none;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        font-size: 18px;
    `;
    
    darkModeToggle.addEventListener('click', toggleDarkMode);
    document.body.appendChild(darkModeToggle);
    
    // Load saved preference
    const savedTheme = formDataStore.theme || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const toggle = document.querySelector('.dark-mode-toggle');
    
    toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    formDataStore.theme = isDark ? 'dark' : 'light';
    
    // Apply dark mode styles
    if (isDark) {
        addDarkModeStyles();
    } else {
        removeDarkModeStyles();
    }
}

function addDarkModeStyles() {
    const darkStyles = document.createElement('style');
    darkStyles.id = 'dark-mode-styles';
    darkStyles.textContent = `
        .dark-mode {
            background: #1a1a1a !important;
            color: #e0e0e0 !important;
        }
        .dark-mode .header {
            background: rgba(26, 26, 26, 0.95) !important;
            border-bottom: 3px solid #8b4513 !important;
        }
        .dark-mode .nav-menu a {
            color: #e0e0e0 !important;
        }
        .dark-mode .hero {
            background: linear-gradient(135deg, #2c3e50, #1a252f) !important;
        }
        .dark-mode .section {
            background: #2c2c2c !important;
        }
        .dark-mode .card, .dark-mode .impact-card, .dark-mode .info-card {
            background: #333 !important;
            border: 1px solid #444 !important;
        }
        .dark-mode .footer {
            background: #1a1a1a !important;
        }
    `;
    document.head.appendChild(darkStyles);
}

function removeDarkModeStyles() {
    const darkStyles = document.getElementById('dark-mode-styles');
    if (darkStyles) {
        darkStyles.remove();
    }
}

// Social Media Integration
function setupSocialFeatures() {
    // Add social sharing buttons for content
    const shareableContent = document.querySelectorAll('.gallery-item, .publication-item');
    
    shareableContent.forEach(item => {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'social-share-btn';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
        shareBtn.title = 'Share this content';
        
        shareBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(139, 69, 19, 0.8);
            color: white;
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        item.style.position = 'relative';
        item.appendChild(shareBtn);
        
        item.addEventListener('mouseenter', () => {
            shareBtn.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', () => {
            shareBtn.style.opacity = '0';
        });
        
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = item.querySelector('h3')?.textContent || 'BVP Content';
            shareContent(title);
        });
    });
}

// Newsletter Subscription
function setupNewsletterFeatures() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailField = this.querySelector('input[type="email"]');
            const email = emailField.value.trim();
            
            if (isValidEmail(email)) {
                showNotification('Thank you for subscribing to our academic newsletter!', 'success');
                emailField.value = '';
                
                // Add to newsletter list (would integrate with email service)
                console.log(`Newsletter subscription: ${email}`);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

// Interactive Timeline
function setupTimelineFeatures() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show detailed content
            const year = this.dataset.year;
            const event = this.querySelector('.timeline-content h4')?.textContent;
            showTimelineModal(year, event);
        });
        
        // Staggered animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

function showTimelineModal(year, event) {
    const modal = document.createElement('div');
    modal.className = 'timeline-modal';
    modal.innerHTML = `
        <div class="timeline-modal-content">
            <div class="modal-header">
                <h3>${year} - ${event}</h3>
                <button class="modal-close-btn" onclick="closeTimelineModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="timeline-details">
                    <h4>Historical Significance</h4>
                    <p>Detailed information about this milestone in BVP's academic journey would be displayed here, including context, impact, and related documentation.</p>
                    <div class="timeline-media">
                        <i class="fas fa-image"></i>
                        <span>Historical photos and documents</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 50);
}

function closeTimelineModal() {
    const modal = document.querySelector('.timeline-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Language Switch Functionality
function setupLanguageSwitch() {
    const langSwitch = document.querySelector('.language-switch');
    if (langSwitch) {
        langSwitch.addEventListener('change', function() {
            const selectedLang = this.value;
            switchLanguage(selectedLang);
        });
    }
}

function switchLanguage(lang) {
    // Store language preference
    formDataStore.language = lang;
    
    // Apply language-specific changes
    const content = {
        'en': {
            title: 'Bharatiya Vidvat Parishat',
            subtitle: 'Preserving Ancient Wisdom for Future Generations'
        },
        'hi': {
            title: 'भारतीय विद्वत् परिषत्',
            subtitle: 'भावी पीढ़ियों के लिए प्राचीन ज्ञान का संरक्षण'
        },
        'sa': {
            title: 'भारतीयविद्वत्परिषत्',
            subtitle: 'भाविपीढीभ्यः प्राचीनज्ञानस्य संरक्षणम्'
        }
    };
    
    const currentContent = content[lang] || content['en'];
    
    // Update main title if exists
    const mainTitle = document.querySelector('.hero h1');
    if (mainTitle) {
        mainTitle.textContent = currentContent.title;
    }
    
    const subtitle = document.querySelector('.hero .subtitle');
    if (subtitle) {
        subtitle.textContent = currentContent.subtitle;
    }
    
    showNotification(`Language switched to ${lang.toUpperCase()}`, 'info');
}



// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = `&copy; ${currentYear} Bharatiya Vidvat Parishat. All rights reserved. | Advancing scholarship since 2009`;
    }
}

function addLoadingAnimation() {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 150);
}

// Error Handling and Graceful Degradation
function setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        showNotification('An unexpected error occurred. Please refresh the page.', 'error');
    });
    
    // Handle missing dependencies gracefully
    if (typeof IntersectionObserver === 'undefined') {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
}

// Performance Monitoring
function setupPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Show performance warning if load time is excessive
        if (loadTime > 3000) {
            showNotification('Page loaded slowly. Consider refreshing for better performance.', 'warning');
        }
    });
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
        setInterval(() => {
            const memInfo = performance.memory;
            if (memInfo.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB threshold
                console.warn('High memory usage detected');
            }
        }, 30000);
    }
}

// Initialize additional features after page load
setTimeout(() => {
    animateCounters();
    addFormEnhancements();
    addAcademicSearch();
    setupAdvancedSearch();
    setupProgressiveEnhancements();
    setupAnalytics();
    setupDarkModeToggle();
    setupTimelineFeatures();
    setupNewsletterFeatures();
    setupSocialFeatures();
    setupLanguageSwitch();
    setupErrorHandling();
    setupPerformanceMonitoring();
}, 1000);

// Export functions for global use
window.BVP = {
    openLoginModal,
    closeLoginModal,
    showNotification,
    performAcademicSearch,
    closeAcademicModal,
    downloadContent,
    shareContent,
    toggleDarkMode,
    switchLanguage,
    closeTimelineModal
};




   // ✅ Validate the form before submission
    function validateDonationForm(form) {
      if (!form.amount.value || parseInt(form.amount.value) < 100) {
        alert("Please enter a valid amount (minimum ₹100).");
        return false;
      }
      if (!form.donor_name.value.trim()) {
        alert("Name is required.");
        return false;
      }
      if (!form.donor_email.value.trim()) {
        alert("Email is required.");
        return false;
      }
      if (!form.donor_phone.value.trim()) {
        alert("Phone number is required.");
        return false;
      }
      return true;
    }

    // ✅ Show a notification
    function showNotification(message, type = "info") {
      alert(message); // simple alert (can replace with fancy UI toast)
    }

    // ✅ Handle form submission
    document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("donateForm");

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validateDonationForm(form)) {
          return;
        }

        const amount = document.getElementById("amount").value;
        showNotification(`Thank you for your generous contribution of ₹${amount}! Processing your donation...`, "success");

        const actionUrl = "https://script.google.com/macros/s/AKfycbxS45EYlofshXJ-IYsg8eDrswn8YjzEgr033ShlmYTNomiTp2g10x_nvSqxuOd-x8I3/exec";
        const formData = new FormData(form);

        fetch(actionUrl, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            showNotification("✅ Donation submitted successfully!", "success");
            console.log("Server response:", data);
            form.reset();
          })
          .catch((error) => {
            showNotification("❌ Error submitting donation. Please try again.", "error");
            console.error("Error:", error);
          });
      });
    });
}
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
