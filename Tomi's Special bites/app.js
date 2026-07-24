// Tomi's Special Bites - Application Logic

// ----------------------------------------------------
// 1. DATA STORES & CONFIG
// ----------------------------------------------------
const MENU_ITEMS = [
    { id: 'p1', name: 'Crunchy Sweet Chin-Chin', price: 4500, category: 'pastries', desc: 'Traditional Nigerian sweet bites, perfectly fried, rich in milk and butter, served in our signature client jars.', img: 'assets/chinchin_jar.png' },
    { id: 'p2', name: 'Premium Pastry Gift Box', price: 15000, category: 'packages', desc: 'An elegant gift package containing cupcakes, cookies, custom bites, and a personalized ribbon note.', img: 'assets/pastry_gift_box.png' },
    { id: 'p3', name: 'Deluxe Velvet Cupcakes', price: 7500, category: 'cakes', desc: 'Box of 6 cupcakes (chocolate, vanilla, red velvet) topped with rich whipped buttercream frostings.', img: 'assets/deluxe_cupcakes.png' },
    { id: 'p4', name: 'Spicy Savory Meat Pie', price: 2500, category: 'pastries', desc: 'Crisp pastry shell filled with seasoned minced beef, potatoes, and local spices.', img: 'assets/nigerian_meatpie.png' },
    { id: 'p5', name: 'Golden Sausage Rolls', price: 2000, category: 'pastries', desc: 'Flaky baked pastry roll containing well-seasoned sausage meat fillings.', img: 'assets/sausage_rolls.png' },
    { id: 'p6', name: 'Double Chocolate Cake', price: 18000, category: 'cakes', desc: 'Rich double layer chocolate sponge cake layered with chocolate fudge icing.', img: 'assets/double_chocolate_cake.png' },
    { id: 'p7', name: 'Red Velvet Special Cake', price: 22000, category: 'cakes', desc: 'Delicate red velvet sponge cake layered with creamy cheese frosting.', img: 'assets/red_velvet_cake.png' },
    { id: 'p8', name: 'Signature Hamper Package', price: 25000, category: 'packages', desc: 'Deluxe gift Hamper containing two jars of chin-chin, 6 cupcakes, cookies, and red grape juice.', img: 'assets/signature_hamper.png' }
];

let cart = [];
let deliveryMode = 'delivery'; // 'delivery' or 'pickup'

const READY_MADE_DESIGNS = [
    {
        id: 'rmd1',
        name: 'Royal Velvet Rose',
        price: 28000,
        tiers: '2 Tiers',
        category: 'multitier',
        subCategory: 'deluxe',
        sponge: 'Red Velvet Sponge',
        frosting: 'Cream Cheese & Strawberry',
        toppings: 'Fondant Roses & Edible Gold Dust',
        badge: 'Bestseller',
        tagClass: 'badge-pink',
        desc: 'An opulent 2-tier red velvet celebration cake enveloped in silky cream cheese frosting, decorated with handcrafted blush fondant roses and subtle edible gold shimmer.',
        img: 'assets/royal_velvet_rose_cake.png',
        serves: '25-30 Guests',
        prepTime: '24-48 Hours'
    },
    {
        id: 'rmd2',
        name: 'Midnight Chocolate Drip',
        price: 24000,
        tiers: '2 Tiers',
        category: 'multitier',
        subCategory: 'chocolate',
        sponge: 'Dark Cocoa Sponge',
        frosting: 'Chocolate Fudge & Ganache',
        toppings: 'Belgian Truffles & Dark Chocolate Drip',
        badge: 'Signature',
        tagClass: 'badge-dark',
        desc: 'Rich double-layer dark chocolate sponge layered with creamy cocoa fudge, finished with a glossy dark chocolate drip and premium chocolate truffles.',
        img: 'assets/midnight_chocolate_drip.png',
        serves: '20-25 Guests',
        prepTime: '24 Hours'
    },
    {
        id: 'rmd3',
        name: 'Golden Vanilla Bliss',
        price: 20000,
        tiers: '1 Tier',
        category: '1tier',
        subCategory: 'deluxe',
        sponge: 'Classic Vanilla Sponge',
        frosting: 'Whipped Buttercream',
        toppings: 'Edible Gold Leaf & Pearl Sprinkles',
        badge: 'Popular',
        tagClass: 'badge-gold',
        desc: 'Elegant single-tier vanilla bean cake frosted with smooth whipped buttercream and decorated with 24k-style edible gold leaf accents and sugar pearls.',
        img: 'assets/golden_vanilla_bliss.png',
        serves: '12-15 Guests',
        prepTime: 'Same Day'
    },
    {
        id: 'rmd4',
        name: 'Tropical Coconut Crunch',
        price: 22000,
        tiers: '1 Tier',
        category: '1tier',
        subCategory: 'deluxe',
        sponge: 'Tender Coconut Sponge',
        frosting: 'White Chocolate Cream',
        toppings: 'Toasted Coconut Flakes & Macaroons',
        badge: 'Fresh Delight',
        tagClass: 'badge-green',
        desc: 'Moist coconut-infused cake layers enveloped in smooth white chocolate cream and covered generously with freshly toasted golden coconut flakes.',
        img: 'assets/tropical_coconut_crunch.png',
        serves: '12-15 Guests',
        prepTime: '24 Hours'
    },
    {
        id: 'rmd5',
        name: 'Grand Strawberry Empress',
        price: 38000,
        tiers: '3 Tiers',
        category: 'multitier',
        subCategory: 'deluxe',
        sponge: 'Vanilla & Strawberry Compote',
        frosting: 'Strawberry Chantilly Cream',
        toppings: 'Fresh Strawberry Crowns & Sugar Lace',
        badge: 'Grand Wedding',
        tagClass: 'badge-luxury',
        desc: 'Majestic 3-tier celebration masterpiece featuring alternating vanilla and strawberry sponges, house compote, and ethereal Chantilly cream piping.',
        img: 'assets/grand_strawberry_empress.png',
        serves: '45-50 Guests',
        prepTime: '48 Hours'
    },
    {
        id: 'rmd6',
        name: 'Lagos Party Crown',
        price: 30000,
        tiers: '2 Tiers',
        category: 'multitier',
        subCategory: 'chocolate',
        sponge: 'Marble Cocoa & Vanilla',
        frosting: 'Salted Caramel Buttercream',
        toppings: 'Salted Caramel Drip & French Macarons',
        badge: 'Fan Favorite',
        tagClass: 'badge-orange',
        desc: 'Showstopping 2-tier marble sponge filled with salted caramel buttercream, crowned with luscious caramel drip and handmade French macarons.',
        img: 'assets/lagos_party_crown.png',
        serves: '25-30 Guests',
        prepTime: '24 Hours'
    }
];

// Currency Formatter Helper
function formatNaira(val) {
    return '₦' + val.toLocaleString();
}

// ----------------------------------------------------
// 2. INITIALIZATION
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    await renderCatalog();
    initMenuToggle();
    initCartDrawer();
    await initReadyMadeCakeDesigns();
    initAdminToggle();
    initCarousel();
    initForms();
    updateCartCount();
    setupIntersectionObserver();
});

// ----------------------------------------------------
// 3. THEME MANAGER
// ----------------------------------------------------
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    const savedTheme = localStorage.getItem('zuri_theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        showToast(`Switched to ${newTheme} mode`);
    });

    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('zuri_theme', theme);

        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
}

// ----------------------------------------------------
// 4. TOAST SYSTEM
// ----------------------------------------------------
function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
        <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ----------------------------------------------------
// 5. RESPONSIVE NAVIGATION
// ----------------------------------------------------
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
            navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ----------------------------------------------------
// 6. CATALOG (MENU) LOGIC
// ----------------------------------------------------
async function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    const tabs = document.getElementById('catalogTabs');
    const searchInput = document.getElementById('catalogSearch');

    let itemsSource = await apiGetMenuItems() || MENU_ITEMS;
    let activeCategory = 'all';
    let searchQuery = '';

    updateCatalogView();

    tabs.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-category');
            updateCatalogView();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        updateCatalogView();
    });

    function updateCatalogView() {
        grid.innerHTML = '';

        const filtered = itemsSource.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery) || item.desc.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 40px 0;">No bites match your criteria.</div>`;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img-wrapper">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="product-info">
                    <h3>${item.name}</h3>
                    <p class="product-desc">${item.desc}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatNaira(item.price)}</span>
                        <button class="add-cart-btn" onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.img}')" aria-label="Add to cart">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

// ----------------------------------------------------
// 7. CART DRAWER & STATE
// ----------------------------------------------------
function initCartDrawer() {
    const cartToggle = document.getElementById('cartToggle');
    const cartClose = document.getElementById('cartClose');
    const cartDrawer = document.getElementById('cartDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const checkoutBtn = document.getElementById('checkoutBtn');

    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    drawerOverlay.addEventListener('click', closeCart);

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast("Your basket is empty!");
            return;
        }
        closeCart();
        openCheckoutModal();
    });
}

function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('drawerOverlay').classList.add('open');
    renderCartItems();
}

function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('open');
}

window.addToCart = function (id, name, price, img, details = null) {
    const existing = cart.find(item => item.id === id && !item.isCustomCake);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            img: img,
            quantity: 1,
            isCustomCake: !!details,
            details: details
        });
    }

    updateCartCount();
    showToast(`Added ${name} to basket`);

    const badge = document.getElementById('cartBadge');
    badge.style.transform = 'scale(1.4)';
    setTimeout(() => badge.style.transform = 'scale(1)', 300);
};

function updateCartCount() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').innerText = totalQty;
}

function renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    const subtotalEl = document.getElementById('cartSubtotal');
    const deliveryRow = document.getElementById('deliveryRow');
    const deliveryEl = document.getElementById('cartDeliveryFee');
    const totalEl = document.getElementById('cartTotal');

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 16px auto;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <p>Your basket is currently empty.</p>
                <a href="#catalog" onclick="closeCart()" class="btn btn-secondary" style="margin-top: 16px; font-size: 0.85rem; padding: 8px 16px;">Browse Menu</a>
            </div>
        `;
        subtotalEl.innerText = '₦0';
        totalEl.innerText = '₦0';
        deliveryRow.style.display = 'none';
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';

        let metaHtml = '';
        if (item.isCustomCake && item.details) {
            metaHtml = `<div class="cart-item-meta">${item.details}</div>`;
        }

        itemEl.innerHTML = `
            <img src="${item.img}" class="cart-item-img" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                ${metaHtml}
                <div class="cart-item-controls">
                    <div class="qty-counter">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                    <span class="cart-item-price">${formatNaira(item.price * item.quantity)}</span>
                    <button class="cart-item-remove" onclick="removeCartItem(${index})" style="color: var(--accent-primary); font-size: 0.85rem; font-weight: 500;">Remove</button>
                </div>
            </div>
        `;
        container.appendChild(itemEl);
    });

    subtotalEl.innerText = formatNaira(subtotal);

    if (deliveryMode === 'delivery') {
        deliveryRow.style.display = 'flex';
        deliveryEl.innerText = '₦1,500';
        totalEl.innerText = formatNaira(subtotal + 1500);
    } else {
        deliveryRow.style.display = 'flex';
        deliveryEl.innerText = 'Free';
        totalEl.innerText = formatNaira(subtotal);
    }
}

window.updateQty = function (index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartCount();
    renderCartItems();
};

window.removeCartItem = function (index) {
    const removedName = cart[index].name;
    cart.splice(index, 1);
    updateCartCount();
    renderCartItems();
    showToast(`Removed ${removedName}`);
};

// ----------------------------------------------------
// 8. READY-MADE CAKE DESIGNS SHOWCASE LOGIC
// ----------------------------------------------------
async function initReadyMadeCakeDesigns() {
    const grid = document.getElementById('readyCakesGrid');
    const tabs = document.getElementById('readyCakesTabs');
    if (!grid || !tabs) return;

    let designsSource = await apiGetReadyMadeDesigns() || READY_MADE_DESIGNS;
    let activeFilter = 'all';

    renderReadyCakes();

    tabs.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-category');
            renderReadyCakes();
        });
    });

    function renderReadyCakes() {
        grid.innerHTML = '';

        const filtered = designsSource.filter(item => {
            if (activeFilter === 'all') return true;
            if (activeFilter === '1tier') return item.category === '1tier';
            if (activeFilter === 'multitier') return item.category === 'multitier';
            if (activeFilter === 'chocolate') return item.subCategory === 'chocolate';
            if (activeFilter === 'deluxe') return item.subCategory === 'deluxe';
            return true;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 40px 0;">No cake designs found in this category.</div>`;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'ready-cake-card';
            card.innerHTML = `
                <div class="ready-cake-img-wrapper">
                    <span class="ready-cake-badge ${item.tagClass}">${item.badge}</span>
                    <span class="ready-cake-tier-tag">${item.tiers}</span>
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="ready-cake-info">
                    <h3 class="ready-cake-title">${item.name}</h3>
                    <p class="ready-cake-desc">${item.desc}</p>
                    
                    <div class="ready-cake-specs">
                        <span class="spec-chip">🍰 ${item.sponge}</span>
                        <span class="spec-chip">🍦 ${item.frosting}</span>
                        <span class="spec-chip">👥 Serves ${item.serves}</span>
                    </div>

                    <div class="ready-cake-footer">
                        <span class="ready-cake-price">${formatNaira(item.price)}</span>
                        <div class="ready-cake-actions">
                            <button class="btn btn-secondary btn-sm" onclick="openDesignModal('${item.id}')">Quick View</button>
                            <button class="btn btn-primary btn-sm" onclick="selectReadyCake('${item.id}')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                                Add Design
                            </button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

window.selectReadyCake = function (designId) {
    const design = READY_MADE_DESIGNS.find(d => d.id === designId);
    if (!design) return;

    const details = `${design.tiers} • ${design.sponge} • ${design.frosting}`;
    addToCart('rmd_' + design.id, design.name, design.price, design.img, details);
    openCart();
};

window.openDesignModal = function (designId) {
    const design = READY_MADE_DESIGNS.find(d => d.id === designId);
    if (!design) return;

    closeAllModals();
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('designModal');
    const modalBody = document.getElementById('designModalBody');

    modalBody.innerHTML = `
        <div class="design-modal-header">
            <div class="ready-cake-img-wrapper" style="height: 200px; border-radius: var(--radius-md); margin-bottom: 20px;">
                <span class="ready-cake-badge ${design.tagClass}">${design.badge}</span>
                <span class="ready-cake-tier-tag">${design.tiers}</span>
                <img src="${design.img}" alt="${design.name}" style="height: 140px;">
            </div>
            <h3 style="font-size: 1.6rem; margin-bottom: 8px; color: var(--text-primary);">${design.name}</h3>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px; line-height: 1.5;">${design.desc}</p>
        </div>

        <div class="design-modal-details">
            <div class="spec-grid">
                <div class="spec-item">
                    <span class="spec-label">Height & Tiers</span>
                    <span class="spec-value">${design.tiers}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Sponge Base</span>
                    <span class="spec-value">${design.sponge}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Frosting / Cream</span>
                    <span class="spec-value">${design.frosting}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Special Toppings</span>
                    <span class="spec-value">${design.toppings}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Guest Portions</span>
                    <span class="spec-value">${design.serves}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Prep & Baking Time</span>
                    <span class="spec-value">${design.prepTime}</span>
                </div>
            </div>
        </div>

        <div class="design-modal-footer">
            <div class="design-modal-price">${formatNaira(design.price)}</div>
            <button class="btn btn-primary" onclick="selectReadyCake('${design.id}'); closeAllModals();">
                Add to Basket
            </button>
        </div>
    `;

    overlay.classList.add('open');
    modal.style.display = 'block';
};

// ----------------------------------------------------
// 9. CLIENT ORDER PLACEMENT FLOW
// ----------------------------------------------------
function openCheckoutModal() {
    closeAllModals();
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('checkoutModal');

    overlay.classList.add('open');
    modal.style.display = 'block';

    goToCheckoutStep(1);
}

window.goToCheckoutStep = function (stepNum) {
    const step1 = document.getElementById('stepPanel1');
    const step2 = document.getElementById('stepPanel2');
    const indicator1 = document.getElementById('stepIndicator1');
    const indicator2 = document.getElementById('stepIndicator2');

    if (stepNum === 1) {
        step1.classList.add('active');
        step2.classList.remove('active');
        indicator1.classList.add('active');
        indicator2.classList.remove('active');
    } else {
        const name = document.getElementById('custName').value.trim();
        const phone = document.getElementById('custPhone').value.trim();
        const email = document.getElementById('custEmail').value.trim();

        if (!name || !phone || !email) {
            showToast("Please fill all contact details!");
            return;
        }

        step1.classList.remove('active');
        step2.classList.add('active');
        indicator1.classList.add('active');
        indicator2.classList.add('active');
    }
};

window.setDeliveryMode = function (mode) {
    deliveryMode = mode;
    const delBtn = document.getElementById('deliveryModeBtn');
    const pickBtn = document.getElementById('pickupModeBtn');
    const addrGroup = document.getElementById('deliveryAddressGroup');
    const addrInput = document.getElementById('custAddress');

    if (mode === 'delivery') {
        delBtn.classList.add('active');
        pickBtn.classList.remove('active');
        addrGroup.style.display = 'flex';
        addrInput.required = true;
    } else {
        delBtn.classList.remove('active');
        pickBtn.classList.add('active');
        addrGroup.style.display = 'none';
        addrInput.required = false;
    }
};

window.closeAllModals = function () {
    document.getElementById('modalOverlay').classList.remove('open');
    document.getElementById('checkoutModal').style.display = 'none';
    document.getElementById('receiptModal').style.display = 'none';
    document.getElementById('historyModal').style.display = 'none';
    const designModal = document.getElementById('designModal');
    if (designModal) designModal.style.display = 'none';
    const adminModal = document.getElementById('adminModal');
    if (adminModal) adminModal.style.display = 'none';
};

// ----------------------------------------------------
// 9. ADMIN ORDER DESK FUNCTIONS
// ----------------------------------------------------
function initAdminToggle() {
    const adminBtn = document.getElementById('adminToggle');
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            closeAllModals();
            document.getElementById('modalOverlay').classList.add('open');
            document.getElementById('adminModal').style.display = 'block';
            renderAdminOrderDesk();
        });
    }
}

async function renderAdminOrderDesk() {
    const container = document.getElementById('adminOrdersList');
    if (!container) return;

    container.innerHTML = '<div style="text-align:center; padding:24px; color:var(--text-secondary);">Loading orders from database...</div>';

    const orders = await apiGetOrderHistory();

    if (!orders || orders.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:30px; color:var(--text-secondary);">No customer orders found in database.</div>';
        return;
    }

    container.innerHTML = '';
    orders.forEach(order => {
        const card = document.createElement('div');
        card.className = 'admin-order-card';

        const itemsText = Array.isArray(order.items)
            ? order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')
            : 'Custom Pastry Order';

        card.innerHTML = `
            <div class="admin-order-header">
                <div>
                    <strong style="font-size:1.1rem; color:var(--accent-primary);">${order.orderNum}</strong>
                    <span style="font-size:0.8rem; color:var(--text-secondary); margin-left:8px;">${new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <span class="admin-order-badge">${order.status}</span>
            </div>
            <div class="admin-order-details">
                <div><strong>Customer:</strong> ${order.name} (${order.phone})</div>
                <div><strong>Target / Address:</strong> ${order.address}</div>
                <div><strong>Items:</strong> ${itemsText}</div>
                <div><strong>Total:</strong> ${formatNaira(order.grandTotal)} (${order.paymentMode})</div>
            </div>
            <div class="admin-order-actions">
                <label style="font-size:0.85rem; font-weight:600;">Update Live Status:</label>
                <select onchange="changeOrderStatus('${order.orderNum}', this.value)" class="form-input" style="padding:6px 12px; font-size:0.85rem;">
                    <option value="Order Received - Payment Awaiting" ${order.status.includes('Received') ? 'selected' : ''}>1. Order Received (Payment Awaiting)</option>
                    <option value="Order Confirmed ✓" ${order.status.includes('Confirmed') ? 'selected' : ''}>2. Order Confirmed ✓</option>
                    <option value="Baking in Progress 🧁" ${order.status.includes('Baking') ? 'selected' : ''}>3. Baking in Progress 🧁</option>
                    <option value="Out for Delivery / Ready 🛵" ${order.status.includes('Delivery') || order.status.includes('Ready') ? 'selected' : ''}>4. Out for Delivery / Ready 🛵</option>
                    <option value="Order Completed 🎉" ${order.status.includes('Completed') ? 'selected' : ''}>5. Order Completed 🎉</option>
                </select>
            </div>
        `;
        container.appendChild(card);
    });
}

window.renderAdminOrderDesk = renderAdminOrderDesk;

window.changeOrderStatus = async function (orderNum, newStatus) {
    const success = await apiUpdateOrderStatus(orderNum, newStatus);
    if (success) {
        showToast(`Updated ${orderNum} status to: ${newStatus}`);
        renderAdminOrderDesk();
    } else {
        showToast('Failed to update status.');
    }
};

function initForms() {
    const checkoutForm = document.getElementById('checkoutForm');
    const reservationForm = document.getElementById('reservationForm');
    const newsletterForm = document.getElementById('newsletterForm');

    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('custName').value.trim();
        const phone = document.getElementById('custPhone').value.trim();
        const email = document.getElementById('custEmail').value.trim();
        const address = deliveryMode === 'delivery' ? document.getElementById('custAddress').value.trim() : 'Pickup at Lekki Kitchen';
        const dateTime = document.getElementById('custTime').value;
        const paymentMode = document.getElementById('custPayment').value;
        const payment = paymentMode === 'bank_transfer' ? 'Bank Transfer (Access Bank)' : 'Cash on Delivery';

        const orderNum = 'TB-' + Math.floor(10000 + Math.random() * 90000);
        const orderDate = new Date().toLocaleString();

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const deliveryFee = deliveryMode === 'delivery' ? 1500 : 0;
        const grandTotal = subtotal + deliveryFee;

        let itemsHtml = '';
        const orderItemsPayload = cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            details: item.details || null
        }));

        cart.forEach(item => {
            const detailsText = item.isCustomCake ? ` - ${item.details}` : '';
            itemsHtml += `
                <div class="receipt-row">
                    <span>${item.quantity}x ${item.name}${detailsText}</span>
                    <span>${formatNaira(item.price * item.quantity)}</span>
                </div>
            `;
        });

        const receiptBox = document.getElementById('receiptContent');
        receiptBox.innerHTML = `
            <div class="receipt-header">
                <h4 style="font-family:'Playfair Display', serif;">Tomi's Special Bites</h4>
                <div class="order-num">RECEIPT ID: ${orderNum}</div>
                <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:4px;">Date: ${orderDate}</div>
            </div>
            <div class="receipt-table">
                ${itemsHtml}
            </div>
            <div class="receipt-table" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
                <div class="receipt-row">
                    <span>Subtotal</span>
                    <span>${formatNaira(subtotal)}</span>
                </div>
                <div class="receipt-row">
                    <span>Delivery Fee</span>
                    <span>${formatNaira(deliveryFee)}</span>
                </div>
                <div class="receipt-row total-row" style="margin-top:8px; padding-top:8px; border-top:1px dashed var(--border-color);">
                    <span>Grand Total</span>
                    <span>${formatNaira(grandTotal)}</span>
                </div>
            </div>
            <div style="margin-top:16px; padding-top:12px; border-top: 1px dashed var(--border-color); font-size:0.8rem; color:var(--text-secondary);">
                <div><strong>Client:</strong> ${name} (${phone})</div>
                <div><strong>Delivery Target:</strong> ${dateTime.replace('T', ' ')}</div>
                <div><strong>Address:</strong> ${address}</div>
                <div><strong>Paid via:</strong> ${payment}</div>
                ${paymentMode === 'bank_transfer' ? `<div style="color: var(--accent-primary); margin-top: 4px; font-weight: 600;">*Please transfer total to Access Bank: 0123456789 (Tomi's Special Bites) and <a href="https://wa.me/message/ZVRYB4P2OW4KG1" target="_blank" style="text-decoration: underline; color: var(--accent-secondary); font-weight: 700;">share WhatsApp receipt</a>.</div>` : ''}
            </div>
        `;

        // Submit to Supabase / Persistent DB
        await apiSubmitOrder({
            orderNum,
            name,
            phone,
            email,
            deliveryMode,
            address,
            dateTime,
            paymentMode,
            subtotal,
            deliveryFee,
            grandTotal,
            items: orderItemsPayload
        });

        // Subscribe to live Realtime order updates
        apiSubscribeOrderStatus(orderNum, (liveStatus) => {
            const titleEl = document.getElementById('statusTitle');
            const textEl = document.getElementById('statusTimeText');
            if (titleEl) titleEl.innerText = liveStatus;
            if (textEl) textEl.innerText = `Live status updated from server: ${liveStatus}`;
            showToast(`Order Status Update: ${liveStatus}`);
        });

        cart = [];
        updateCartCount();

        document.getElementById('checkoutModal').style.display = 'none';
        document.getElementById('receiptModal').style.display = 'block';
        showToast("Order logged successfully!");

        simulateOrderStatus(paymentMode);

        checkoutForm.reset();
    });

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('resName').value;
        const selection = document.getElementById('resGuests').value;
        const date = document.getElementById('resDateTime').value;

        showToast(`Inquiry sent for ${name} (${selection}) on ${date}!`);
        reservationForm.reset();
    });

    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            await apiSubscribeNewsletter(emailInput.value);
        }
        showToast("Subscribed! Check your inbox for vouchers.");
        newsletterForm.reset();
    });

    document.getElementById('historyToggle').addEventListener('click', openHistoryModal);
}

function simulateOrderStatus(paymentMode) {
    const titleEl = document.getElementById('statusTitle');
    const textEl = document.getElementById('statusTimeText');

    if (paymentMode === 'bank_transfer') {
        titleEl.innerText = "Awaiting Bank Transfer";
        textEl.innerText = "Please transfer amount to Access Bank: 0123456789. We will start baking immediately after confirmation.";

        setTimeout(() => {
            if (document.getElementById('receiptModal').style.display === 'block') {
                titleEl.innerText = "Transfer Confirmed ✓";
                textEl.innerText = "Payment verified. Baking ingredients (Chin-Chin, Cupcakes) prep is underway!";
                showToast("Payment verified, baking started!");
            }
        }, 12000);
    } else {
        titleEl.innerText = "Order Received & Verified";
        textEl.innerText = "We are preparing ingredients for your cupcakes and chin-chin...";

        setTimeout(() => {
            if (document.getElementById('receiptModal').style.display === 'block') {
                titleEl.innerText = "Baking in Progress 🧁";
                textEl.innerText = "Ovens are busy baking your delicious bites!";
                showToast("Ovens are baking your order!");
            }
        }, 12000);
    }

    setTimeout(() => {
        if (document.getElementById('receiptModal').style.display === 'block') {
            titleEl.innerText = deliveryMode === 'delivery' ? "Out for Delivery 🛵" : "Ready for Pickup at Lekki Kitchen! 🛍️";
            textEl.innerText = deliveryMode === 'delivery' ? "Dispatch rider is heading to your Lekki address." : "Boxed and ready at 15 Orchid Road. Visit us!";
            showToast("Your bites are ready!");
        }
    }, 28000);
}

function openHistoryModal() {
    closeAllModals();
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('historyModal');
    const list = document.getElementById('historyList');

    overlay.classList.add('open');
    modal.style.display = 'block';

    const orderHistory = JSON.parse(localStorage.getItem('zuri_order_history') || '[]');
    list.innerHTML = '';

    if (orderHistory.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding: 40px 0; color:var(--text-secondary);">You have not placed any orders yet.</div>`;
        return;
    }

    orderHistory.forEach(order => {
        const card = document.createElement('div');
        card.className = 'history-card';
        card.innerHTML = `
            <div class="history-card-header">
                <h4>${order.orderNum}</h4>
                <span>${order.date}</span>
            </div>
            <div class="history-card-body">
                <p style="margin-bottom:8px;"><strong>Items:</strong> ${order.items.join(', ')}</p>
                <p><strong>Mode:</strong> ${order.mode.toUpperCase()}</p>
            </div>
            <div class="history-card-footer">
                <span class="history-card-total">Total Paid: ${formatNaira(order.total)}</span>
                <span class="history-card-status">${order.status}</span>
            </div>
        `;
        list.appendChild(card);
    });
}

// ----------------------------------------------------
// 10. REVIEWS CAROUSEL
// ----------------------------------------------------
function initCarousel() {
    const prev = document.getElementById('prevSlide');
    const next = document.getElementById('nextSlide');
    const wrapper = document.getElementById('carouselWrapper');

    let currentIndex = 0;
    const slidesCount = wrapper.children.length;

    prev.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slidesCount - 1;
        updateCarousel();
    });

    next.addEventListener('click', () => {
        currentIndex = (currentIndex < slidesCount - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    function updateCarousel() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

// ----------------------------------------------------
// 11. DYNAMIC NAVIGATION SCROLL INTERSECT
// ----------------------------------------------------
function setupIntersectionObserver() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const options = {
        root: null,
        threshold: 0.3,
        rootMargin: "-80px 0px 0px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
}
