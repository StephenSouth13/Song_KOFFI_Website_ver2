// Main JavaScript file for Sống KOFFI website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initCustomCursor();
    initScrollAnimations();
    initMenuFilters();
    initBookingForm();
    initContactForm();
    initAuthForms();
    initModals();
    initFloatingActions();
    loadData();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;
        
        cursorX += diffX * 0.1;
        cursorY += diffY * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add steam effect on click
    document.addEventListener('click', () => {
        cursor.classList.add('clicked');
        setTimeout(() => {
            cursor.classList.remove('clicked');
        }, 300);
    });

    // Hide cursor on touch devices
    document.addEventListener('touchstart', () => {
        cursor.style.display = 'none';
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-card, .blog-card, .menu-item').forEach(el => {
        observer.observe(el);
    });
}

// Menu filters
function initMenuFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter menu items
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animate');
                }
            });
        });
    });
}

// Booking form functionality
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;

    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    let currentStep = 1;

    // Next button functionality
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep < 4) {
                    currentStep++;
                    updateStep();
                }
            }
        });
    });

    // Previous button functionality
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateStep();
            }
        });
    });

    function updateStep() {
        // Update step indicators
        steps.forEach((step, index) => {
            if (index + 1 <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update form steps
        formSteps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update summary on step 4
        if (currentStep === 4) {
            updateBookingSummary();
        }
    }

    function validateStep(step) {
        const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
        const requiredFields = currentFormStep.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        return isValid;
    }

    function updateBookingSummary() {
        const summary = document.getElementById('bookingSummary');
        const formData = new FormData(bookingForm);
        
        const summaryHTML = `
            <div class="summary-item">
                <span class="summary-label">Họ và Tên:</span>
                <span class="summary-value">${formData.get('fullName')}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Điện Thoại:</span>
                <span class="summary-value">${formData.get('phone')}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Email:</span>
                <span class="summary-value">${formData.get('email')}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Ngày:</span>
                <span class="summary-value">${formData.get('bookingDate')}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Giờ:</span>
                <span class="summary-value">${formData.get('bookingTime')}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Số Khách:</span>
                <span class="summary-value">${formData.get('guests')}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Chỗ Ngồi:</span>
                <span class="summary-value">${formData.get('seating') || 'Không chọn'}</span>
            </div>
            ${formData.get('notes') ? `
            <div class="summary-item">
                <span class="summary-label">Ghi Chú:</span>
                <span class="summary-value">${formData.get('notes')}</span>
            </div>
            ` : ''}
        `;
        
        summary.innerHTML = summaryHTML;
    }

    // Form submission
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const bookingData = Object.fromEntries(formData.entries());
        bookingData.id = Date.now();
        bookingData.status = 'pending';
        bookingData.createdAt = new Date().toISOString();

        try {
            const response = await fetch('admin/save_booking.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                showSuccessModal();
                bookingForm.reset();
                currentStep = 1;
                updateStep();
            } else {
                alert('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    });

    // Set minimum date to today
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const contactData = Object.fromEntries(formData.entries());
        contactData.id = Date.now();
        contactData.createdAt = new Date().toISOString();

        try {
            const response = await fetch('admin/save_contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData)
            });

            if (response.ok) {
                alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
                contactForm.reset();
            } else {
                alert('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    });
}

// Authentication forms
function initAuthForms() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Demo login - in real app, this would authenticate with backend
            alert('Đăng nhập thành công! (Demo)');
            window.location.href = 'index.html';
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').textContent = 'Mật khẩu không khớp';
                return;
            }
            
            // Demo registration - in real app, this would save to backend
            alert('Đăng ký thành công! (Demo)');
            window.location.href = 'login.html';
        });
    }

    // Password toggle functionality
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                toggle.textContent = '🙈';
            } else {
                input.type = 'password';
                toggle.textContent = '👁️';
            }
        });
    });

    // Form validation
    document.querySelectorAll('input[required]').forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        let errorMessage = '';

        if (!value) {
            errorMessage = 'Trường này là bắt buộc';
        } else if (field.type === 'email' && !isValidEmail(value)) {
            errorMessage = 'Email không hợp lệ';
        } else if (field.type === 'tel' && !isValidPhone(value)) {
            errorMessage = 'Số điện thoại không hợp lệ';
        } else if (field.name === 'password' && value.length < 6) {
            errorMessage = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
        
        field.style.borderColor = errorMessage ? '#e74c3c' : '';
    }

    function clearError(e) {
        const field = e.target;
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
        field.style.borderColor = '';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^[0-9]{10,11}$/.test(phone.replace(/\s/g, ''));
    }
}

// Modal functionality
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close, .btn-close');

    // Close modal when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Blog modal functionality
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('click', () => {
            const blogId = card.dataset.id;
            openBlogModal(blogId);
        });
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function openBlogModal(blogId) {
    // This would fetch blog content from backend
    const modal = document.getElementById('blogModal');
    const modalBody = document.getElementById('modalBody');
    
    if (modal && modalBody) {
        modalBody.innerHTML = `
            <h2>Blog Post ${blogId}</h2>
            <p>This is a demo blog post content. In a real application, this would fetch the actual blog content from the backend.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        `;
        modal.classList.add('active');
    }
}

// Floating action buttons
function initFloatingActions() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Messenger and chatbot buttons (demo functionality)
    document.querySelectorAll('.messenger-btn, .chatbot-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Tính năng này sẽ được phát triển trong tương lai!');
        });
    });
}

// Load data from JSON files
async function loadData() {
    try {
        // Load products
        const productsResponse = await fetch('data/products.json');
        if (productsResponse.ok) {
            const products = await productsResponse.json();
            displayFeaturedProducts(products);
            displayMenuItems(products);
        }

        // Load blog posts
        const postsResponse = await fetch('data/posts.json');
        if (postsResponse.ok) {
            const posts = await postsResponse.json();
            displayLatestPosts(posts);
            displayBlogPosts(posts);
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function displayFeaturedProducts(products) {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featured = products.filter(product => product.featured).slice(0, 3);
    
    container.innerHTML = featured.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price.toLocaleString('vi-VN')}đ</div>
            </div>
        </div>
    `).join('');
}

function displayMenuItems(products) {
    const container = document.getElementById('menuGrid');
    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="menu-item" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${product.name}</h3>
                    <div class="menu-item-price">${product.price.toLocaleString('vi-VN')}đ</div>
                </div>
                <p class="menu-item-description">${product.description}</p>
                <span class="menu-item-category">${getCategoryName(product.category)}</span>
            </div>
        </div>
    `).join('');
}

function displayLatestPosts(posts) {
    const container = document.getElementById('latestPosts');
    if (!container) return;

    const latest = posts.slice(0, 3);
    
    container.innerHTML = latest.map(post => `
        <div class="blog-card" data-id="${post.id}">
            <img src="${post.image}" alt="${post.title}" class="blog-image">
            <div class="blog-info">
                <div class="blog-date">${formatDate(post.date)}</div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
            </div>
        </div>
    `).join('');
}

function displayBlogPosts(posts) {
    const container = document.getElementById('blogGrid');
    if (!container) return;

    container.innerHTML = posts.map(post => `
        <div class="blog-card" data-id="${post.id}">
            <img src="${post.image}" alt="${post.title}" class="blog-image">
            <div class="blog-info">
                <div class="blog-date">${formatDate(post.date)}</div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
            </div>
        </div>
    `).join('');
}

// Utility functions
function getCategoryName(category) {
    const categories = {
        'espresso': 'Espresso',
        'cold-brew': 'Cold Brew',
        'signature': 'Signature',
        'dessert': 'Tráng Miệng'
    };
    return categories[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn form reload mặc định

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // TODO: Validate hoặc gửi AJAX login nếu cần

    // Nếu email & password hợp lệ thì chuyển hướng
    if (email && password) {
        // Giả lập đăng nhập thành công
        window.location.href = "dashboard.php";
    } else {
        // Hiển thị lỗi (tùy bạn)
        alert("Vui lòng nhập đủ email và mật khẩu.");
    }
});
