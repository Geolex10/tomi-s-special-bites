// Tomi's Special Bites - Supabase Client Integration & Database Service

// ----------------------------------------------------
// 1. CONFIGURATION & CLIENT INITIALIZATION
// ----------------------------------------------------
// Replace SUPABASE_URL and SUPABASE_ANON_KEY with your project credentials from supabase.com dashboard
const SUPABASE_URL = window.SUPABASE_CONFIG?.url || 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = window.SUPABASE_CONFIG?.anonKey || 'YOUR_SUPABASE_ANON_KEY';

let supabaseClient = null;
let isSupabaseConnected = false;

if (window.supabase && typeof window.supabase.createClient === 'function' && !SUPABASE_URL.includes('YOUR_SUPABASE_PROJECT_ID')) {
    try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        isSupabaseConnected = true;
        console.log('[Supabase] Initialized successfully.');
    } catch (err) {
        console.warn('[Supabase] Failed to initialize client:', err);
    }
} else {
    console.info('[Supabase] Operating in local fallback mode. Add your Supabase keys in index.html to activate live cloud database.');
}

// Helper for local storage order persistence fallback
function getLocalOrders() {
    return JSON.parse(localStorage.getItem('tb_orders_db') || '[]');
}

function saveLocalOrders(orders) {
    localStorage.setItem('tb_orders_db', JSON.stringify(orders));
}

// ----------------------------------------------------
// 2. DATA SERVICE METHODS
// ----------------------------------------------------

/**
 * Fetch Menu Items from Supabase or fallback
 */
async function apiGetMenuItems() {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('menu_items').select('*').order('id');
            if (!error && data && data.length > 0) {
                return data.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: Number(item.price),
                    category: item.category,
                    desc: item.desc_text,
                    img: item.img
                }));
            }
        } catch (err) {
            console.warn('[Supabase] Error fetching menu_items:', err);
        }
    }
    const local = localStorage.getItem('tb_menu_items');
    if (local) return JSON.parse(local);
    return null; // Return null to trigger default fallback array in app.js
}

/**
 * Save / Update Menu Item (including Picture URL/file)
 */
async function apiSaveMenuItem(item) {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const row = {
                id: item.id,
                name: item.name,
                price: Number(item.price),
                category: item.category,
                desc_text: item.desc,
                img: item.img
            };
            const { error } = await supabaseClient.from('menu_items').upsert(row);
            if (error) throw error;
            console.log('[Supabase] Saved menu item:', item.id);
        } catch (err) {
            console.warn('[Supabase] Error saving menu item:', err);
        }
    }
    // Update local storage fallback
    const local = localStorage.getItem('tb_menu_items');
    let list = local ? JSON.parse(local) : (window.CURRENT_MENU_ITEMS || []);
    const idx = list.findIndex(i => i.id === item.id);
    if (idx >= 0) {
        list[idx] = item;
    } else {
        list.push(item);
    }
    localStorage.setItem('tb_menu_items', JSON.stringify(list));
    return true;
}

/**
 * Delete Menu Item
 */
async function apiDeleteMenuItem(id) {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { error } = await supabaseClient.from('menu_items').delete().eq('id', id);
            if (error) throw error;
            console.log('[Supabase] Deleted menu item:', id);
        } catch (err) {
            console.warn('[Supabase] Error deleting menu item:', err);
        }
    }
    const local = localStorage.getItem('tb_menu_items');
    let list = local ? JSON.parse(local) : (window.CURRENT_MENU_ITEMS || []);
    list = list.filter(i => i.id !== id);
    localStorage.setItem('tb_menu_items', JSON.stringify(list));
    return true;
}

/**
 * Fetch Ready-Made Cake Designs from Supabase or fallback
 */
async function apiGetReadyMadeDesigns() {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('ready_made_designs').select('*').order('id');
            if (!error && data && data.length > 0) {
                return data.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: Number(item.price),
                    tiers: item.tiers,
                    category: item.category,
                    subCategory: item.sub_category,
                    sponge: item.sponge,
                    frosting: item.frosting,
                    toppings: item.toppings,
                    badge: item.badge,
                    tagClass: item.tag_class,
                    desc: item.desc_text,
                    img: item.img,
                    serves: item.serves,
                    prepTime: item.prep_time
                }));
            }
        } catch (err) {
            console.warn('[Supabase] Error fetching ready_made_designs:', err);
        }
    }
    const local = localStorage.getItem('tb_ready_designs');
    if (local) return JSON.parse(local);
    return null;
}

/**
 * Save / Update Ready-Made Cake Design (including Picture URL/file)
 */
async function apiSaveReadyMadeDesign(design) {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const row = {
                id: design.id,
                name: design.name,
                price: Number(design.price),
                tiers: design.tiers || '1 Tier',
                category: design.category || '1tier',
                sub_category: design.subCategory || 'deluxe',
                sponge: design.sponge || 'Vanilla',
                frosting: design.frosting || 'Buttercream',
                toppings: design.toppings || 'Decorations',
                badge: design.badge || 'Popular',
                tag_class: design.tagClass || 'badge-pink',
                desc_text: design.desc,
                img: design.img,
                serves: design.serves || '12-15 Guests',
                prep_time: design.prepTime || '24 Hours'
            };
            const { error } = await supabaseClient.from('ready_made_designs').upsert(row);
            if (error) throw error;
            console.log('[Supabase] Saved ready_made_design:', design.id);
        } catch (err) {
            console.warn('[Supabase] Error saving ready_made_design:', err);
        }
    }
    const local = localStorage.getItem('tb_ready_designs');
    let list = local ? JSON.parse(local) : (window.CURRENT_READY_DESIGNS || []);
    const idx = list.findIndex(i => i.id === design.id);
    if (idx >= 0) {
        list[idx] = design;
    } else {
        list.push(design);
    }
    localStorage.setItem('tb_ready_designs', JSON.stringify(list));
    return true;
}

/**
 * Delete Ready-Made Cake Design
 */
async function apiDeleteReadyMadeDesign(id) {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { error } = await supabaseClient.from('ready_made_designs').delete().eq('id', id);
            if (error) throw error;
            console.log('[Supabase] Deleted ready_made_design:', id);
        } catch (err) {
            console.warn('[Supabase] Error deleting ready_made_design:', err);
        }
    }
    const local = localStorage.getItem('tb_ready_designs');
    let list = local ? JSON.parse(local) : (window.CURRENT_READY_DESIGNS || []);
    list = list.filter(i => i.id !== id);
    localStorage.setItem('tb_ready_designs', JSON.stringify(list));
    return true;
}

/**
 * Upload Image File directly to Supabase Storage Bucket ('product-images')
 */
async function apiUploadImageToSupabase(file) {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const ext = file.name.split('.').pop() || 'png';
            const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
            const fileName = `img_${Date.now()}_${cleanName}.${ext}`;
            
            const { data, error } = await supabaseClient.storage
                .from('product-images')
                .upload(fileName, file, { cacheControl: '3600', upsert: true });

            if (error) {
                console.warn('[Supabase Storage] Upload notice:', error.message);
                return null;
            }

            const { data: publicUrlData } = supabaseClient.storage
                .from('product-images')
                .getPublicUrl(fileName);

            if (publicUrlData && publicUrlData.publicUrl) {
                console.log('[Supabase Storage] Upload success! Public URL:', publicUrlData.publicUrl);
                return publicUrlData.publicUrl;
            }
        } catch (err) {
            console.warn('[Supabase Storage] Error uploading image file:', err);
        }
    }
    return null;
}

/**
 * Submit New Customer Order
 */
async function apiSubmitOrder(orderPayload) {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('orders').insert([{
                order_num: orderPayload.orderNum,
                customer_name: orderPayload.name,
                customer_phone: orderPayload.phone,
                customer_email: orderPayload.email,
                delivery_mode: orderPayload.deliveryMode,
                delivery_address: orderPayload.address,
                delivery_time: orderPayload.dateTime,
                payment_method: orderPayload.paymentMode,
                subtotal: orderPayload.subtotal,
                delivery_fee: orderPayload.deliveryFee,
                total: orderPayload.grandTotal,
                items: orderPayload.items,
                status: 'Order Received - Payment Awaiting'
            }]).select().single();

            if (!error && data) {
                console.log('[Supabase] Order submitted to database:', data.order_num);
                return {
                    success: true,
                    orderNum: data.order_num,
                    status: data.status,
                    createdAt: data.created_at
                };
            } else {
                console.error('[Supabase] Insert Order Error:', error);
            }
        } catch (err) {
            console.error('[Supabase] Exception on submit order:', err);
        }
    }

    // Local Storage Fallback
    const localOrders = getLocalOrders();
    const newOrder = {
        orderNum: orderPayload.orderNum,
        name: orderPayload.name,
        phone: orderPayload.phone,
        email: orderPayload.email,
        deliveryMode: orderPayload.deliveryMode,
        address: orderPayload.address,
        dateTime: orderPayload.dateTime,
        paymentMode: orderPayload.paymentMode,
        subtotal: orderPayload.subtotal,
        deliveryFee: orderPayload.deliveryFee,
        grandTotal: orderPayload.grandTotal,
        items: orderPayload.items,
        status: 'Order Received - Payment Awaiting',
        createdAt: new Date().toISOString()
    };
    localOrders.unshift(newOrder);
    saveLocalOrders(localOrders);

    return {
        success: true,
        orderNum: newOrder.orderNum,
        status: newOrder.status,
        createdAt: newOrder.createdAt
    };
}

/**
 * Fetch Order History
 */
async function apiGetOrderHistory() {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('orders').select('*').order('created_at', { ascending: false });
            if (!error && data) {
                return data.map(d => ({
                    orderNum: d.order_num,
                    name: d.customer_name,
                    phone: d.customer_phone,
                    email: d.customer_email,
                    deliveryMode: d.delivery_mode,
                    address: d.delivery_address,
                    dateTime: d.delivery_time,
                    paymentMode: d.payment_method,
                    subtotal: Number(d.subtotal),
                    deliveryFee: Number(d.delivery_fee),
                    grandTotal: Number(d.total),
                    items: d.items,
                    status: d.status,
                    createdAt: d.created_at
                }));
            }
        } catch (err) {
            console.warn('[Supabase] Error fetching orders history:', err);
        }
    }
    return getLocalOrders();
}

/**
 * Update Order Fulfillment Status (Admin Function)
 */
async function apiUpdateOrderStatus(orderNum, newStatus) {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { error } = await supabaseClient.from('orders').update({ status: newStatus }).eq('order_num', orderNum);
            if (!error) {
                console.log(`[Supabase] Updated status for ${orderNum} to ${newStatus}`);
                return true;
            }
        } catch (err) {
            console.error('[Supabase] Error updating order status:', err);
        }
    }

    // Local Storage Fallback
    const orders = getLocalOrders();
    const target = orders.find(o => o.orderNum === orderNum);
    if (target) {
        target.status = newStatus;
        saveLocalOrders(orders);
        return true;
    }
    return false;
}

/**
 * Delete a Single Order (Admin Action)
 */
async function apiDeleteOrder(orderNum) {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { error } = await supabaseClient.from('orders').delete().eq('order_num', orderNum);
            if (error) throw error;
            console.log('[Supabase] Deleted order:', orderNum);
        } catch (err) {
            console.warn('[Supabase] Error deleting order:', err);
        }
    }
    const orders = getLocalOrders().filter(o => o.orderNum !== orderNum);
    saveLocalOrders(orders);
    return true;
}

/**
 * Clear Order History (Completed / Cancelled or All)
 */
async function apiClearOrderHistory(completedOnly = true) {
    if (isSupabaseConnected && supabaseClient) {
        try {
            if (completedOnly) {
                await supabaseClient.from('orders').delete().or('status.ilike.%Completed%,status.ilike.%Canceled%,status.ilike.%Cancelled%');
            } else {
                await supabaseClient.from('orders').delete().neq('order_num', 'NONE');
            }
        } catch (err) {
            console.warn('[Supabase] Error clearing orders:', err);
        }
    }

    if (completedOnly) {
        const orders = getLocalOrders().filter(o => !o.status.toLowerCase().includes('completed') && !o.status.toLowerCase().includes('cancel'));
        saveLocalOrders(orders);
    } else {
        saveLocalOrders([]);
    }
    return true;
}

/**
 * Supabase Realtime Subscription for Receipt Order Status Updates
 */
function apiSubscribeOrderStatus(orderNum, onStatusChange) {
    if (isSupabaseConnected && supabaseClient) {
        const channel = supabaseClient.channel(`order-status-${orderNum}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `order_num=eq.${orderNum}`
                },
                (payload) => {
                    if (payload.new && payload.new.status) {
                        console.log(`[Realtime] Received status update for ${orderNum}:`, payload.new.status);
                        onStatusChange(payload.new.status);
                    }
                }
            )
            .subscribe();

        return () => supabaseClient.removeChannel(channel);
    }
    return () => {};
}

/**
 * Submit Newsletter Email
 */
async function apiSubscribeNewsletter(email) {
    if (isSupabaseConnected && supabaseClient) {
        try {
            await supabaseClient.from('subscribers').insert([{ email }]);
        } catch (err) {
            console.warn('[Supabase] Subscriber save error:', err);
        }
    }
    const subs = JSON.parse(localStorage.getItem('tb_subscribers') || '[]');
    if (!subs.includes(email)) subs.push(email);
    localStorage.setItem('tb_subscribers', JSON.stringify(subs));
    return true;
}

// ----------------------------------------------------
// 3. ADMIN USERS & AUDIT LOGGING SERVICE
// ----------------------------------------------------

window.ADMIN_USERS_CACHE = [
    { id: '1', email: 'tomi@gmail.com', passwordCode: '1234', fullName: 'Tomi (Main Admin)', role: 'Super Admin', createdAt: new Date().toISOString() }
];

function getCachedAdmins() {
    const local = localStorage.getItem('tb_admin_users');
    if (local) {
        try {
            const parsed = JSON.parse(local);
            if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
    }
    return window.ADMIN_USERS_CACHE;
}

/**
 * Fetch Staff Accounts (Gmail identities)
 */
async function apiGetAdminUsers() {
    const cached = getCachedAdmins();
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('admin_users').select('*').order('created_at');
            if (!error && data && data.length > 0) {
                const mapped = data.map(u => ({
                    id: u.id,
                    email: u.email || u.username || 'tomi@gmail.com',
                    passwordCode: u.password_code || u.pin_code || '1234',
                    fullName: u.full_name || 'Tomi (Main Admin)',
                    role: u.role || 'Super Admin',
                    createdAt: u.created_at
                }));
                window.ADMIN_USERS_CACHE = mapped;
                localStorage.setItem('tb_admin_users', JSON.stringify(mapped));
                return mapped;
            }
        } catch (err) {
            console.warn('[Supabase] Error fetching admin_users:', err);
        }
    }
    return cached;
}

/**
 * Create or Update Staff Account using Gmail identity
 */
async function apiSaveAdminUser(user) {
    const email = user.email.toLowerCase().trim();
    if (isSupabaseConnected && supabaseClient) {
        try {
            const row = {
                email: email,
                password_code: user.passwordCode,
                full_name: user.fullName,
                role: user.role || 'Staff'
            };
            const { error } = await supabaseClient.from('admin_users').upsert(row, { onConflict: 'email' });
            if (error) throw error;
            console.log('[Supabase] Saved admin user:', email);
        } catch (err) {
            console.warn('[Supabase] Error saving admin user:', err);
        }
    }
    const list = await apiGetAdminUsers();
    const idx = list.findIndex(u => u.email.toLowerCase() === email);
    if (idx >= 0) {
        list[idx] = { ...list[idx], ...user, email };
    } else {
        list.push({ ...user, email, createdAt: new Date().toISOString() });
    }
    localStorage.setItem('tb_admin_users', JSON.stringify(list));
    return true;
}

/**
 * Delete Staff Account
 */
async function apiDeleteAdminUser(email) {
    const targetEmail = email.toLowerCase().trim();
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { error } = await supabaseClient.from('admin_users').delete().eq('email', targetEmail);
            if (error) throw error;
        } catch (err) {
            console.warn('[Supabase] Error deleting admin user:', err);
        }
    }
    const list = await apiGetAdminUsers();
    const filtered = list.filter(u => u.email.toLowerCase() !== targetEmail);
    localStorage.setItem('tb_admin_users', JSON.stringify(filtered));
    return true;
}

/**
 * Log Admin Action to Audit Trail
 */
async function apiLogAdminActivity(adminName, action, details) {
    const entry = {
        admin_name: adminName || 'Staff Admin',
        action: action,
        details: details
    };

    if (isSupabaseConnected && supabaseClient) {
        try {
            await supabaseClient.from('admin_audit_logs').insert([entry]);
        } catch (err) {
            console.warn('[Supabase] Error logging admin activity:', err);
        }
    }

    const logs = JSON.parse(localStorage.getItem('tb_admin_logs') || '[]');
    logs.unshift({
        id: Date.now(),
        adminName: entry.admin_name,
        action: entry.action,
        details: entry.details,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('tb_admin_logs', JSON.stringify(logs.slice(0, 200)));
    return true;
}

/**
 * Fetch Admin Activity Logs
 */
async function apiGetAuditLogs() {
    if (isSupabaseConnected && supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('admin_audit_logs').select('*').order('created_at', { ascending: false }).limit(150);
            if (!error && data && data.length > 0) {
                return data.map(l => ({
                    id: l.id,
                    adminName: l.admin_name,
                    action: l.action,
                    details: l.details,
                    createdAt: l.created_at
                }));
            }
        } catch (err) {
            console.warn('[Supabase] Error fetching audit logs:', err);
        }
    }
    const local = localStorage.getItem('tb_admin_logs');
    if (local) return JSON.parse(local);
    return [];
}
