-- ====================================================
-- SUPABASE DATABASE SCHEMA FOR TOMI'S SPECIAL BITES
-- Execute this SQL script in your Supabase SQL Editor
-- ====================================================

-- 1. Create Menu Items Table
CREATE TABLE IF NOT EXISTS public.menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    desc_text TEXT NOT NULL,
    img TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Ready-Made Cake Designs Table
CREATE TABLE IF NOT EXISTS public.ready_made_designs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    tiers TEXT NOT NULL,
    category TEXT NOT NULL,
    sub_category TEXT NOT NULL,
    sponge TEXT NOT NULL,
    frosting TEXT NOT NULL,
    toppings TEXT NOT NULL,
    badge TEXT NOT NULL,
    tag_class TEXT NOT NULL,
    desc_text TEXT NOT NULL,
    img TEXT NOT NULL,
    serves TEXT NOT NULL,
    prep_time TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Customer Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_num TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    delivery_mode TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_time TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    subtotal NUMERIC NOT NULL,
    delivery_fee NUMERIC NOT NULL,
    total NUMERIC NOT NULL,
    items JSONB NOT NULL,
    status TEXT DEFAULT 'Awaiting Confirmation' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Subscribers Table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ready_made_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create Policies for Anonymous & Public Access
CREATE POLICY "Allow public all access to menu_items" ON public.menu_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access to ready_made_designs" ON public.ready_made_designs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public insert and read access to orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public insert access to subscribers" ON public.subscribers FOR INSERT WITH CHECK (true);

-- Enable Realtime for Orders table
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- Insert Default Menu Items Data
INSERT INTO public.menu_items (id, name, price, category, desc_text, img) VALUES
('p1', 'Crunchy Sweet Chin-Chin', 4500, 'pastries', 'Traditional Nigerian sweet bites, perfectly fried, rich in milk and butter, served in our signature client jars.', 'assets/chinchin_jar.png'),
('p2', 'Premium Pastry Gift Box', 15000, 'packages', 'An elegant gift package containing cupcakes, cookies, custom bites, and a personalized ribbon note.', 'assets/pastry_gift_box.png'),
('p3', 'Deluxe Velvet Cupcakes', 7500, 'cakes', 'Box of 6 cupcakes (chocolate, vanilla, red velvet) topped with rich whipped buttercream frostings.', 'assets/deluxe_cupcakes.png'),
('p4', 'Spicy Savory Meat Pie', 2500, 'pastries', 'Crisp pastry shell filled with seasoned minced beef, potatoes, and local spices.', 'assets/nigerian_meatpie.png'),
('p5', 'Golden Sausage Rolls', 2000, 'pastries', 'Flaky baked pastry roll containing well-seasoned sausage meat fillings.', 'assets/sausage_rolls.png'),
('p6', 'Double Chocolate Cake', 18000, 'cakes', 'Rich double layer chocolate sponge cake layered with chocolate fudge icing.', 'assets/double_chocolate_cake.png'),
('p7', 'Red Velvet Special Cake', 22000, 'cakes', 'Delicate red velvet sponge cake layered with creamy cheese frosting.', 'assets/red_velvet_cake.png'),
('p8', 'Signature Hamper Package', 25000, 'packages', 'Deluxe gift Hamper containing two jars of chin-chin, 6 cupcakes, cookies, and red grape juice.', 'assets/signature_hamper.png')
ON CONFLICT (id) DO NOTHING;

-- Insert Default Ready-Made Designs Data
INSERT INTO public.ready_made_designs (id, name, price, tiers, category, sub_category, sponge, frosting, toppings, badge, tag_class, desc_text, img, serves, prep_time) VALUES
('rmd1', 'Royal Velvet Rose', 28000, '2 Tiers', 'multitier', 'deluxe', 'Red Velvet Sponge', 'Cream Cheese & Strawberry', 'Fondant Roses & Edible Gold Dust', 'Bestseller', 'badge-pink', 'An opulent 2-tier red velvet celebration cake enveloped in silky cream cheese frosting, decorated with handcrafted blush fondant roses and subtle edible gold shimmer.', 'assets/royal_velvet_rose_cake.png', '25-30 Guests', '24-48 Hours'),
('rmd2', 'Midnight Chocolate Drip', 24000, '2 Tiers', 'multitier', 'chocolate', 'Dark Cocoa Sponge', 'Chocolate Fudge & Ganache', 'Belgian Truffles & Dark Chocolate Drip', 'Signature', 'badge-dark', 'Rich double-layer dark chocolate sponge layered with creamy cocoa fudge, finished with a glossy dark chocolate drip and premium chocolate truffles.', 'assets/midnight_chocolate_drip.png', '20-25 Guests', '24 Hours'),
('rmd3', 'Golden Vanilla Bliss', 20000, '1 Tier', '1tier', 'deluxe', 'Classic Vanilla Sponge', 'Whipped Buttercream', 'Edible Gold Leaf & Pearl Sprinkles', 'Popular', 'badge-gold', 'Elegant single-tier vanilla bean cake frosted with smooth whipped buttercream and decorated with 24k-style edible gold leaf accents and sugar pearls.', 'assets/golden_vanilla_bliss.png', '12-15 Guests', 'Same Day'),
('rmd4', 'Tropical Coconut Crunch', 22000, '1 Tier', '1tier', 'deluxe', 'Tender Coconut Sponge', 'White Chocolate Cream', 'Toasted Coconut Flakes & Macaroons', 'Fresh Delight', 'badge-green', 'Moist coconut-infused cake layers enveloped in smooth white chocolate cream and covered generously with freshly toasted golden coconut flakes.', 'assets/tropical_coconut_crunch.png', '12-15 Guests', '24 Hours'),
('rmd5', 'Grand Strawberry Empress', 38000, '3 Tiers', 'multitier', 'deluxe', 'Vanilla & Strawberry Compote', 'Strawberry Chantilly Cream', 'Fresh Strawberry Crowns & Sugar Lace', 'Grand Wedding', 'badge-luxury', 'Majestic 3-tier celebration masterpiece featuring alternating vanilla and strawberry sponges, house compote, and ethereal Chantilly cream piping.', 'assets/grand_strawberry_empress.png', '45-50 Guests', '48 Hours'),
('rmd6', 'Lagos Party Crown', 30000, '2 Tiers', 'multitier', 'chocolate', 'Marble Cocoa & Vanilla', 'Salted Caramel Buttercream', 'Salted Caramel Drip & French Macarons', 'Fan Favorite', 'badge-orange', 'Showstopping 2-tier marble sponge filled with salted caramel buttercream, crowned with luscious caramel drip and handmade French macarons.', 'assets/lagos_party_crown.png', '25-30 Guests', '24 Hours')
ON CONFLICT (id) DO NOTHING;

-- 5. Create Staff / Admin Accounts Table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    pin_code TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'Staff' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Default Super Admin Account (Username: tomi, PIN: 1234)
INSERT INTO public.admin_users (username, pin_code, full_name, role) VALUES
('tomi', '1234', 'Tomi (Super Admin)', 'Super Admin')
ON CONFLICT (username) DO NOTHING;

-- 6. Create Staff Activity & Audit Logs Table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_name TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all access to admin_users" ON public.admin_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access to admin_audit_logs" ON public.admin_audit_logs FOR ALL USING (true) WITH CHECK (true);
