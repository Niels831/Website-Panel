// ============================================
// ZansPanel - Main JavaScript
// ============================================

// Initialize Lucide icons
lucide.createIcons();

// ============================================
// DATA - Products
// ============================================
const products = [
    {
        id: 1,
        name: "VPS Starter",
        category: "vps",
        price: 25000,
        priceLabel: "Rp 25K",
        period: "/bulan",
        description: "VPS entry-level cocok untuk belajar dan project kecil.",
        specs: ["1 vCPU", "1GB RAM", "20GB NVMe", "1TB BW"],
        badge: "popular",
        badgeText: "Popular",
        image: "http://static.photos/technology/320x240/10",
        icon: "server"
    },
    {
        id: 2,
        name: "VPS Pro",
        category: "vps",
        price: 50000,
        priceLabel: "Rp 50K",
        period: "/bulan",
        description: "VPS mid-range untuk project menengah dan production.",
        specs: ["2 vCPU", "4GB RAM", "50GB NVMe", "3TB BW"],
        badge: "hot",
        badgeText: "Hot Deal",
        image: "http://static.photos/technology/320x240/20",
        icon: "server"
    },
    {
        id: 3,
        name: "VPS Enterprise",
        category: "vps",
        price: 100000,
        priceLabel: "Rp 100K",
        period: "/bulan",
        description: "VPS high-performance untuk beban kerja berat.",
        specs: ["4 vCPU", "8GB RAM", "100GB NVMe", "Unlimited BW"],
        badge: "new",
        badgeText: "New",
        image: "http://static.photos/technology/320x240/30",
        icon: "server"
    },
    {
        id: 4,
        name: "Minecraft Server",
        category: "game",
        price: 15000,
        priceLabel: "Rp 15K",
        period: "/bulan",
        description: "Server Minecraft dengan performa optimal dan mod support.",
        specs: ["2 vCPU", "4GB RAM", "50GB NVMe", "DDoS Shield"],
        badge: "popular",
        badgeText: "Popular",
        image: "http://static.photos/gaming/320x240/5",
        icon: "gamepad-2"
    },
    {
        id: 5,
        name: "Valheim Server",
        category: "game",
        price: 20000,
        priceLabel: "Rp 20K",
        period: "/bulan",
        description: "Server Valheim dengan low latency dan auto-backup.",
        specs: ["2 vCPU", "4GB RAM", "40GB NVMe", "DDoS Shield"],
        badge: "hot",
        badgeText: "Hot",
        image: "http://static.photos/gaming/320x240/15",
        icon: "gamepad-2"
    },
    {
        id: 6,
        name: "Rust Server",
        category: "game",
        price: 35000,
        priceLabel: "Rp 35K",
        period: "/bulan",
        description: "Server Rust dengan performa tinggi dan mod manager.",
        specs: ["4 vCPU", "8GB RAM", "60GB NVMe", "DDoS Shield"],
        badge: null,
        badgeText: null,
        image: "http://static.photos/gaming/320x240/25",
        icon: "gamepad-2"
    },
    {
        id: 7,
        name: "Web Hosting",
        category: "hosting",
        price: 10000,
        priceLabel: "Rp 10K",
        period: "/bulan",
        description: "Hosting cepat dengan cPanel, SSL gratis, dan auto-backup.",
        specs: ["5GB NVMe", "Unlimited BW", "SSL Gratis", "cPanel"],
        badge: "popular",
        badgeText: "Best Seller",
        image: "http://static.photos/workspace/320x240/10",
        icon: "globe"
    },
    {
        id: 8,
        name: "Reseller Hosting",
        category: "hosting",
        price: 30000,
        priceLabel: "Rp 30K",
        period: "/bulan",
        description: "Mulai jual hosting sendiri dengan panel WHM/cPanel.",
        specs: ["25GB NVMe", "Unlimited BW", "WHM Access", "Free SSL"],
        badge: "new",
        badgeText: "New",
        image: "http://static.photos/workspace/320x240/20",
        icon: "globe"
    },
    {
        id: 9,
        name: "Discord Bot Hosting",
        category: "bot",
        price: 8000,
        priceLabel: "Rp 8K",
        period: "/bulan",
        description: "Hosting bot Discord 24/7 dengan auto-restart dan monitoring.",
        specs: ["1 vCPU", "1GB RAM", "10GB NVMe", "Auto Restart"],
        badge: "hot",
        badgeText: "Hot",
        image: "http://static.photos/technology/320x240/50",
        icon: "bot"
    },
    {
        id: 10,
        name: "WhatsApp Bot Hosting",
        category: "bot",
        price: 12000,
        priceLabel: "Rp 12K",
        period: "/bulan",
        description: "Hosting WA Bot dengan uptime tinggi dan QR scanning.",
        specs: ["1 vCPU", "2GB RAM", "15GB NVMe", "Auto Restart"],
        badge: null,
        badgeText: null,
        image: "http://static.photos/technology/320x240/60",
        icon: "bot"
    },
    {
        id: 11,
        name: "VPS Ultra",
        category: "vps",
        price: 200000,
        priceLabel: "Rp 200K",
        period: "/bulan",
        description: "VPS ultimate untuk enterprise dan high-traffic applications.",
        specs: ["8 vCPU", "16GB RAM", "200GB NVMe", "Unlimited BW"],
        badge: "new",
        badgeText: "New",
        image: "http://static.photos/technology/320x240/40",
        icon: "server"
    },
    {
        id: 12,
        name: "ARMA Reforger Server",
        category: "game",
        price: 45000,
        priceLabel: "Rp 45K",
        period: "/bulan",
        description: "Server ARMA Reforger dengan mod support dan high tick rate.",
        specs: ["4 vCPU", "12GB RAM", "80GB NVMe", "DDoS Shield"],
        badge: null,
        badgeText: null,
        image: "http://static.photos/gaming/320x240/35",
        icon: "gamepad-2"
    }
];

// ============================================
// STATE
// ============================================
let cart = [];
let currentFilter = 'all';
let isYearly = false;
let currentOrderProduct = null;

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(filter = 'all') {
    const grid = document.getElementById('products-grid');
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    grid.innerHTML = filtered.map(product => `
        <div class="card-hover rounded-2xl bg-dark-700/50 backdrop-blur-sm overflow-hidden group" data-category="${product.category}">
            <div class="relative h-40 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-dark-700 to-transparent"></div>
                ${product.badge ? `
                    <div class="absolute top-3 right-3 badge-${product.badge} px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide">
                        ${product.badgeText}
                    </div>
                ` : ''}
                <div class="absolute bottom-3 left-3">
                    <div class="w-10 h-10 rounded-xl bg-dark-700/80 backdrop-blur-sm flex items-center justify-center border border-dark-500/50">
                        <i data-lucide="${product.icon}" class="w-5 h-5 text-accent-400"></i>
                    </div>
                </div>
            </div>
            <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-semibold text-white">${product.name}</h3>
                    <span class="text-xs text-gray-500 uppercase tracking-wider">${product.category}</span>
                </div>
                <p class="text-sm text-gray-400 mb-4">${product.description}</p>
                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${product.specs.map(spec => `
                        <span class="px-2 py-1 bg-dark-600/50 rounded-md text-[11px] text-gray-400 border border-dark-500/30">${spec}</span>
                    `).join('')}
                </div>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-xl font-bold gradient-text">${product.priceLabel}</span>
                        <span class="text-xs text-gray-500">${product.period}</span>
                    </div>
                    <button onclick="addToCart('${product.name}', ${product.price})" class="px-4 py-2 bg-accent-600 hover:bg-accent-500 rounded-lg text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-accent-500/25 flex items-center gap-1.5">
                        <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
                        Order
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize lucide icons for new elements
    lucide.createIcons();
}

// ============================================
// FILTER PRODUCTS
// ============================================
function filterProducts(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
            btn.classList.remove('bg-dark-600', 'text-gray-400');
            btn.classList.add('bg-accent-600', 'text-white');
        } else {
            btn.classList.remove('active', 'bg-accent-600', 'text-white');
            btn.classList.add('bg-dark-600', 'text-gray-400');
        }
    });
    
    renderProducts(category);
}

// ============================================
// CART FUNCTIONS
// ============================================
function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCartUI();
    showToast(`${name} ditambahkan ke cart! 🛒`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // Update badges
    const badge = document.getElementById('cart-badge');
    const badgeMobile = document.getElementById('cart-badge-mobile');
    
    if (totalItems > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
        badge.textContent = totalItems;
        badgeMobile.textContent = totalItems;
    } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
        badgeMobile.textContent = '0';
    }
    
    // Update cart items
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.classList.remove('hidden');
        cartFooter.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        cartFooter.classList.remove('hidden');
        cartTotal.textContent = formatPrice(totalPrice);
        
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="flex items-center gap-4 p-4 bg-dark-600/50 rounded-xl border border-dark-500/30">
                <div class="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <i data-lucide="package" class="w-5 h-5 text-accent-400"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-white truncate">${item.name}</div>
                    <div class="text-xs text-gray-500">${formatPrice(item.price)} x ${item.qty}</div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="changeQty(${index}, -1)" class="w-7 h-7 rounded-md bg-dark-500 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <i data-lucide="minus" class="w-3 h-3"></i>
                    </button>
                    <span class="text-sm font-medium text-white w-5 text-center">${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)" class="w-7 h-7 rounded-md bg-dark-500 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <i data-lucide="plus" class="w-3 h-3"></i>
                    </button>
                </div>
                <button onclick="removeFromCart(${index})" class="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        `).join('');
    }
    
    lucide.createIcons();
}

function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function openCart() {
    document.getElementById('cart-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateCartUI();
}

function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

function checkout() {
    if (cart.length === 0) return;
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let message = `🛒 *Order dari ZansPanel*\n\n`;
    message += `*Items:*\n`;
    cart.forEach(item => {
        message += `- ${item.name} x${item.qty} (${formatPrice(item.price * item.qty)})\n`;
    });
    message += `\n*Total: ${formatPrice(totalPrice)}*\n`;
    message += `\nMohon proses order saya. Terima kasih! 🙏`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
}

// ============================================
// ORDER MODAL
// ============================================
function openOrderModal(productName, productPrice) {
    currentOrderProduct = { name: productName, price: productPrice };
    document.getElementById('order-product-name').textContent = productName;
    document.getElementById('order-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    document.getElementById('order-modal').classList.add('hidden');
    document.body.style.overflow = '';
    currentOrderProduct = null;
}

function submitOrder() {
    const name = document.getElementById('order-name').value.trim();
    const wa = document.getElementById('order-wa').value.trim();
    const note = document.getElementById('order-note').value.trim();
    
    if (!name) {
        showToast('Mohon isi nama lengkap! ⚠️');
        return;
    }
    if (!wa) {
        showToast('Mohon isi nomor WhatsApp! ⚠️');
        return;
    }
    
    let message = `🛒 *Order dari ZansPanel*\n\n`;
    message += `*Nama:* ${name}\n`;
    message += `*WhatsApp:* ${wa}\n`;
    if (currentOrderProduct) {
        message += `*Produk:* ${currentOrderProduct.name}\n`;
        message += `*Harga:* ${formatPrice(currentOrderProduct.price)}\n`;
    }
    if (note) {
        message += `*Catatan:* ${note}\n`;
    }
    message += `\nMohon proses order saya. Terima kasih! 🙏`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
    
    closeOrderModal();
    showToast('Order dikirim via WhatsApp! ✅');
}

// ============================================
// BILLING TOGGLE
// ============================================
function toggleBilling() {
    isYearly = !isYearly;
    const dot = document.getElementById('billing-dot');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');
    
    if (isYearly) {
        dot.style.left = '32px';
        monthlyPrices.forEach(el => el.classList.add('hidden'));
        yearlyPrices.forEach(el => el.classList.remove('hidden'));
    } else {
        dot.style.left = '4px';
        monthlyPrices.forEach(el => el.classList.remove('hidden'));
        yearlyPrices.forEach(el => el.classList.add('hidden'));
    }
}

// ============================================
// MOBILE MENU
// ============================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    menu.classList.toggle('open');
    overlay.classList.toggle('hidden');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast px-4 py-3 bg-dark-600 border border-dark-500 rounded-xl text-sm text-white shadow-lg flex items-center gap-2 min-w-[250px]';
    toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-green-400 flex-shrink-0"></i><span>${message}</span>`;
    container.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ============================================
// UTILITY
// ============================================
function formatPrice(price) {
    return 'Rp ' + price.toLocaleString('id-ID');
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(elementId, target, duration = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    function step() {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + '+';
            return;
        }
        element.textContent = Math.floor(start).toLocaleString() + '+';
        requestAnimationFrame(step);
    }
    
    step();
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('border-b', 'border-dark-500/50');
    } else {
        navbar.classList.remove('border-dark-500/50');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// INTERSECTION OBSERVER for animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Make hero visible immediately
const hero = document.getElementById('home');
if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize filter buttons styling
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.category === 'all') {
            btn.classList.add('bg-accent-600', 'text-white');
        } else {
            btn.classList.add('bg-dark-600', 'text-gray-400');
        }
    });
    
    // Render products
    renderProducts('all');
    
    // Animate counters
    setTimeout(() => {
        animateCounter('stat-users', 1500);
        animateCounter('stat-servers', 500);
    }, 500);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCart();
        closeOrderModal();
        const menu = document.getElementById('mobile-menu');
        if (menu.classList.contains('open')) {
            toggleMobileMenu();
        }
    }
});
