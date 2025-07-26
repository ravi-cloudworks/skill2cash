-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE wizard_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Creators policies
CREATE POLICY "Creators can view their own profile" ON creators
    FOR SELECT USING (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Creators can update their own profile" ON creators
    FOR UPDATE USING (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Anyone can view active creators" ON creators
    FOR SELECT USING (status = 'active');

CREATE POLICY "Anyone can insert creator profile" ON creators FOR INSERT WITH CHECK (true);

-- Products policies
CREATE POLICY "Anyone can view active products" ON products
    FOR SELECT USING (status = 'active');

CREATE POLICY "Creators can manage their own products" ON products
    FOR ALL USING (creator_id IN (
        SELECT id FROM creators WHERE clerk_user_id = auth.jwt() ->> 'sub'
    ));

-- Customers policies
CREATE POLICY "Customers can view their own profile" ON customers
    FOR SELECT USING (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Customers can update their own profile" ON customers
    FOR UPDATE USING (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Anyone can insert customer profile" ON customers FOR INSERT WITH CHECK (true);

-- Orders policies
CREATE POLICY "Customers can view their own orders" ON orders
    FOR SELECT USING (customer_id IN (
        SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Creators can view orders for their products" ON orders
    FOR SELECT USING (creator_id IN (
        SELECT id FROM creators WHERE clerk_user_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Customers can create orders" ON orders
    FOR INSERT WITH CHECK (customer_id IN (
        SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Order owners can update orders" ON orders FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub') OR
    creator_id IN (SELECT id FROM creators WHERE clerk_user_id = auth.jwt() ->> 'sub')
);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Customers can create reviews for their purchases" ON reviews
    FOR INSERT WITH CHECK (
        customer_id IN (
            SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub'
        ) AND
        order_id IN (
            SELECT id FROM orders WHERE customer_id IN (
                SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub'
            )
        )
    );

CREATE POLICY "Customers can update own reviews" ON reviews FOR UPDATE USING (
    customer_id IN (SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub')
);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages
    FOR SELECT USING (
        (sender_type = 'customer' AND sender_id IN (
            SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub'
        )) OR
        (sender_type = 'creator' AND sender_id IN (
            SELECT id FROM creators WHERE clerk_user_id = auth.jwt() ->> 'sub'
        )) OR
        (recipient_type = 'customer' AND recipient_id IN (
            SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub'
        )) OR
        (recipient_type = 'creator' AND recipient_id IN (
            SELECT id FROM creators WHERE clerk_user_id = auth.jwt() ->> 'sub'
        ))
    );

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (
        (sender_type = 'customer' AND sender_id IN (
            SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub'
        )) OR
        (sender_type = 'creator' AND sender_id IN (
            SELECT id FROM creators WHERE clerk_user_id = auth.jwt() ->> 'sub'
        ))
    );

-- Analytics events policies
CREATE POLICY "Allow analytics tracking" ON analytics_events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Creators can view their analytics" ON analytics_events
    FOR SELECT USING (
        creator_id IN (
            SELECT id FROM creators WHERE clerk_user_id = auth.jwt() ->> 'sub'
        )
    );

CREATE POLICY "Anyone can insert analytics events" ON analytics_events FOR INSERT WITH CHECK (true);

-- Wizard responses policies
CREATE POLICY "Users can manage own wizard responses" ON wizard_responses FOR ALL USING (
    (user_type = 'customer' AND user_id IN (SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub')) OR
    (user_type = 'creator' AND user_id IN (SELECT id FROM creators WHERE clerk_user_id = auth.jwt() ->> 'sub'))
);

-- Admin settings policies (admin only)
CREATE POLICY "Only admins can manage settings" ON admin_settings FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
);

-- Banners policies
CREATE POLICY "Anyone can view active banners" ON banners FOR SELECT USING (active = true);
CREATE POLICY "Only admins can manage banners" ON banners FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
);

-- File uploads policies
CREATE POLICY "Users can view their own uploads" ON file_uploads
    FOR SELECT USING (
        (uploader_type = 'customer' AND uploaded_by IN (
            SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub'
        )) OR
        (uploader_type = 'creator' AND uploaded_by IN (
            SELECT id FROM creators WHERE clerk_user_id = auth.jwt() ->> 'sub'
        ))
    );

CREATE POLICY "Users can upload files" ON file_uploads
    FOR INSERT WITH CHECK (
        (uploader_type = 'customer' AND uploaded_by IN (
            SELECT id FROM customers WHERE clerk_user_id = auth.jwt() ->> 'sub'
        )) OR
        (uploader_type = 'creator' AND uploaded_by IN (
            SELECT id FROM creators WHERE clerk_user_id = auth.jwt() ->> 'sub'
        ))
    );
