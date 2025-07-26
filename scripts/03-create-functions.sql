-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    order_count INTEGER;
    order_date TEXT;
BEGIN
    -- Get current date in YYYYMMDD format
    order_date := TO_CHAR(NOW(), 'YYYYMMDD');
    
    -- Get count of orders created today
    SELECT COUNT(*) + 1 INTO order_count
    FROM orders
    WHERE DATE(created_at) = CURRENT_DATE;
    
    -- Return formatted order number
    RETURN 'S2C-' || order_date || '-' || LPAD(order_count::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to update creator statistics
CREATE OR REPLACE FUNCTION update_creator_stats(creator_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE creators SET
        total_products = (
            SELECT COUNT(*) FROM products 
            WHERE creator_id = creator_uuid AND status = 'active'
        ),
        total_sales = (
            SELECT COALESCE(SUM(sales_count), 0) FROM products 
            WHERE creator_id = creator_uuid
        ),
        total_revenue = (
            SELECT COALESCE(SUM(revenue), 0) FROM products 
            WHERE creator_id = creator_uuid
        ),
        avg_rating = (
            SELECT COALESCE(AVG(rating), 0) FROM products 
            WHERE creator_id = creator_uuid AND review_count > 0
        ),
        updated_at = NOW()
    WHERE id = creator_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to update product statistics
CREATE OR REPLACE FUNCTION update_product_stats(product_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE products SET
        review_count = (
            SELECT COUNT(*) FROM reviews WHERE product_id = product_uuid
        ),
        rating = (
            SELECT COALESCE(AVG(rating::DECIMAL), 0) FROM reviews 
            WHERE product_id = product_uuid
        ),
        updated_at = NOW()
    WHERE id = product_uuid;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL THEN
        NEW.order_number := generate_order_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
    BEFORE INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION set_order_number();

-- Trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update timestamp trigger to all tables
CREATE TRIGGER update_creators_updated_at BEFORE UPDATE ON creators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE ON admin_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update product stats when review is added/updated/deleted
CREATE OR REPLACE FUNCTION trigger_update_product_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        PERFORM update_product_stats(OLD.product_id);
        RETURN OLD;
    ELSE
        PERFORM update_product_stats(NEW.product_id);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_reviews_update_product_stats
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION trigger_update_product_stats();

-- Trigger to update creator stats when product is added/updated/deleted
CREATE OR REPLACE FUNCTION trigger_update_creator_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        PERFORM update_creator_stats(OLD.creator_id);
        RETURN OLD;
    ELSE
        PERFORM update_creator_stats(NEW.creator_id);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_products_update_creator_stats
    AFTER INSERT OR UPDATE OR DELETE ON products
    FOR EACH ROW
    EXECUTE FUNCTION trigger_update_creator_stats();
