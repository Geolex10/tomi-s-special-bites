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
