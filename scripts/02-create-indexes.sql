-- Performance indexes
CREATE INDEX idx_creators_clerk_user_id ON creators(clerk_user_id);
CREATE INDEX idx_creators_store_url ON creators(store_url);
CREATE INDEX idx_creators_status ON creators(status);
CREATE INDEX idx_creators_verified ON creators(verified);

CREATE INDEX idx_customers_clerk_user_id ON customers(clerk_user_id);
CREATE INDEX idx_customers_email ON customers(email);

CREATE INDEX idx_products_creator_id ON products(creator_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_products_rating ON products(rating DESC);
CREATE INDEX idx_products_sales_count ON products(sales_count DESC);

CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_creator_id ON orders(creator_id);
CREATE INDEX idx_orders_product_id ON orders(product_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_order_number ON orders(order_number);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_product_id ON analytics_events(product_id);
CREATE INDEX idx_analytics_events_creator_id ON analytics_events(creator_id);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at DESC);

CREATE INDEX idx_file_uploads_uploaded_by ON file_uploads(uploaded_by);
CREATE INDEX idx_file_uploads_related_entity ON file_uploads(related_entity_type, related_entity_id);
CREATE INDEX idx_file_uploads_bucket_name ON file_uploads(bucket_name);
