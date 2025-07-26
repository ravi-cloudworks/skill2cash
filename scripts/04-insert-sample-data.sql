-- Insert sample creators (HR-focused)
INSERT INTO creators (
    clerk_user_id, name, email, store_name, store_url, tagline, description, 
    color_theme, upi_id, location, verified, total_products, total_revenue, 
    total_sales, avg_rating, follower_count
) VALUES 
(
    'user_demo_ravi', 'Ravi Kumar', 'ravi@hrhub.com', 'Ravi HR Hub', 'ravi-hr-hub',
    'Transforming HR with practical solutions', 
    'HR professional with 12+ years experience in talent management, policy development, and organizational culture. Helping companies build better workplaces.',
    '#059669', 'ravi@paytm', 'Mumbai, India', true, 8, 45600, 152, 4.8, 1240
),
(
    'user_demo_priya', 'Priya Sharma', 'priya@talentpro.com', 'Talent Pro Solutions', 'talent-pro-solutions',
    'Expert recruitment and talent strategies',
    'Recruitment specialist and talent acquisition expert. Sharing proven strategies for hiring, onboarding, and retention.',
    '#7C3AED', 'priya@gpay', 'Bangalore, India', true, 6, 32400, 108, 4.7, 890
),
(
    'user_demo_store', 'Demo Store', 'demo@skillcash.com', 'Demo Store', 'demo-store',
    'Sample products and templates',
    'Demo store showcasing various HR products and templates for testing purposes.',
    '#3B82F6', 'demo@upi', 'Delhi, India', false, 4, 12000, 40, 4.5, 250
);

-- Insert sample customers
INSERT INTO customers (
    clerk_user_id, name, email, phone, location, total_purchases, total_spent
) VALUES 
(
    'user_customer_1', 'Amit Patel', 'amit@company.com', '+91-9876543210', 'Ahmedabad, India', 3, 1797
),
(
    'user_customer_2', 'Sneha Reddy', 'sneha@startup.com', '+91-8765432109', 'Hyderabad, India', 2, 1198
),
(
    'user_customer_3', 'Rajesh Singh', 'rajesh@corp.com', '+91-7654321098', 'Pune, India', 1, 599
);

-- Insert sample products (HR-focused)
INSERT INTO products (
    creator_id, title, slug, short_description, description, price, compare_price,
    category, status, whats_included, features, tags, sales_count, view_count,
    rating, review_count, revenue
) VALUES 
(
    (SELECT id FROM creators WHERE store_url = 'ravi-hr-hub'),
    'Complete HR Policy Library', 'hr-policy-library',
    'Ready-to-use HR policies for Indian companies',
    'Comprehensive collection of 50+ HR policies covering recruitment, performance management, leave policies, code of conduct, and more. All policies are legally compliant and customizable for your organization.',
    899, 1299, 'HR Policies', 'active',
    '["50+ HR Policy Templates", "Legal Compliance Checklist", "Customization Guide", "Email Templates", "Implementation Roadmap"]',
    '["Legally Compliant", "Customizable Templates", "Industry Best Practices", "Email Support", "Lifetime Updates"]',
    '["hr-policies", "templates", "compliance", "documentation"]',
    45, 1250, 4.9, 12, 40455
),
(
    (SELECT id FROM creators WHERE store_url = 'ravi-hr-hub'),
    'Employee Onboarding Masterclass', 'employee-onboarding-masterclass',
    'Complete guide to effective employee onboarding',
    'Step-by-step guide to creating an exceptional onboarding experience. Includes templates, checklists, and proven strategies to reduce turnover and increase engagement.',
    599, 899, 'Training', 'active',
    '["4-Hour Video Course", "Onboarding Templates", "Checklists & Forms", "Case Studies", "Certificate of Completion"]',
    '["Video Lessons", "Downloadable Resources", "Real Examples", "Expert Support", "Mobile Access"]',
    '["onboarding", "training", "employee-experience", "hr-process"]',
    38, 890, 4.8, 9, 22762
),
(
    (SELECT id FROM creators WHERE store_url = 'talent-pro-solutions'),
    'Recruitment Strategy Toolkit', 'recruitment-strategy-toolkit',
    'Modern recruitment strategies and templates',
    'Complete toolkit for modern recruitment including job description templates, interview guides, assessment frameworks, and candidate evaluation matrices.',
    699, 999, 'Recruitment', 'active',
    '["Job Description Templates", "Interview Question Bank", "Assessment Tools", "Evaluation Matrices", "Recruitment Metrics Dashboard"]',
    '["100+ Templates", "Structured Interviews", "Skills Assessment", "Data-Driven Hiring", "ATS Integration"]',
    '["recruitment", "hiring", "interviews", "assessment"]',
    32, 720, 4.7, 8, 22368
),
(
    (SELECT id FROM creators WHERE store_url = 'talent-pro-solutions'),
    'Performance Management System', 'performance-management-system',
    'Complete performance management framework',
    'End-to-end performance management system with goal setting, regular check-ins, performance reviews, and development planning templates.',
    799, 1199, 'Performance', 'active',
    '["Goal Setting Templates", "Review Forms", "360-Degree Feedback", "Development Plans", "Performance Metrics"]',
    '["Continuous Feedback", "Goal Tracking", "Development Focus", "Manager Training", "Employee Self-Assessment"]',
    '["performance", "goals", "feedback", "development"]',
    28, 650, 4.6, 7, 22372
),
(
    (SELECT id FROM creators WHERE store_url = 'demo-store'),
    'Docker Microservices Guide', 'docker-microservices',
    'Complete Docker and microservices implementation',
    'Learn to build, deploy, and scale microservices using Docker. Includes practical examples and production-ready configurations.',
    599, 899, 'DevOps', 'active',
    '["Docker Fundamentals", "Microservices Architecture", "Deployment Scripts", "Monitoring Setup", "Best Practices Guide"]',
    '["Hands-on Examples", "Production Ready", "Scalable Solutions", "Expert Support", "Source Code"]',
    '["docker", "microservices", "devops", "containers"]',
    15, 420, 4.5, 4, 8985
);

-- Insert sample orders
INSERT INTO orders (
    customer_id, creator_id, product_id, amount, status, payment_method, 
    payment_reference, upi_transaction_id
) VALUES 
(
    (SELECT id FROM customers WHERE email = 'amit@company.com'),
    (SELECT id FROM creators WHERE store_url = 'ravi-hr-hub'),
    (SELECT id FROM products WHERE slug = 'hr-policy-library'),
    899, 'completed', 'upi', 'UPI123456789', 'TXN001234567890'
),
(
    (SELECT id FROM customers WHERE email = 'sneha@startup.com'),
    (SELECT id FROM creators WHERE store_url = 'talent-pro-solutions'),
    (SELECT id FROM products WHERE slug = 'recruitment-strategy-toolkit'),
    699, 'completed', 'upi', 'UPI987654321', 'TXN009876543210'
),
(
    (SELECT id FROM customers WHERE email = 'rajesh@corp.com'),
    (SELECT id FROM creators WHERE store_url = 'ravi-hr-hub'),
    (SELECT id FROM products WHERE slug = 'employee-onboarding-masterclass'),
    599, 'completed', 'upi', 'UPI456789123', 'TXN004567891230'
);

-- Insert sample reviews
INSERT INTO reviews (
    product_id, customer_id, order_id, rating, comment, verified
) VALUES 
(
    (SELECT id FROM products WHERE slug = 'hr-policy-library'),
    (SELECT id FROM customers WHERE email = 'amit@company.com'),
    (SELECT id FROM orders WHERE payment_reference = 'UPI123456789'),
    5, 'Excellent collection of HR policies. Saved us months of work!', true
),
(
    (SELECT id FROM products WHERE slug = 'recruitment-strategy-toolkit'),
    (SELECT id FROM customers WHERE email = 'sneha@startup.com'),
    (SELECT id FROM orders WHERE payment_reference = 'UPI987654321'),
    5, 'Very comprehensive toolkit. The interview templates are fantastic!', true
),
(
    (SELECT id FROM products WHERE slug = 'employee-onboarding-masterclass'),
    (SELECT id FROM customers WHERE email = 'rajesh@corp.com'),
    (SELECT id FROM orders WHERE payment_reference = 'UPI456789123'),
    4, 'Good content, but could use more real-world examples.', true
);

-- Insert sample messages
INSERT INTO messages (
    sender_id, sender_type, recipient_id, recipient_type, subject, content, emotion, status
) VALUES 
(
    (SELECT id FROM customers WHERE email = 'amit@company.com'),
    'customer',
    (SELECT id FROM creators WHERE store_url = 'ravi-hr-hub'),
    'creator',
    'Question about HR Policy Implementation',
    'Hi Ravi, I purchased your HR Policy Library and it''s fantastic! I have a question about implementing the leave policy in our HRMS system. Could you provide some guidance?',
    'happy',
    'unread'
),
(
    (SELECT id FROM customers WHERE email = 'sneha@startup.com'),
    'customer',
    (SELECT id FROM creators WHERE store_url = 'talent-pro-solutions'),
    'creator',
    'Customization Help Needed',
    'Hello Priya, I need help customizing the interview templates for our tech startup. We have some specific requirements for our engineering roles.',
    'confused',
    'read'
);

-- Insert admin settings
INSERT INTO admin_settings (key, value, description) VALUES 
('platform_commission', '{"rate": 0.05, "currency": "INR"}', 'Platform commission rate'),
('payment_methods', '{"upi": true, "card": false, "wallet": true}', 'Enabled payment methods'),
('file_upload_limits', '{"max_size_mb": 100, "allowed_types": ["pdf", "zip", "docx", "mp4"]}', 'File upload restrictions'),
('email_notifications', '{"order_confirmation": true, "download_ready": true, "review_reminder": true}', 'Email notification settings');

-- Insert sample banners
INSERT INTO banners (title, content, type, target_audience, is_active) VALUES 
('Welcome to Skill2Cash', 'Transform your HR expertise into income! Join thousands of professionals already earning.', 'success', 'all', true),
('New Creator Program', 'Special launch offer: 0% commission for first 30 days! Start selling your HR knowledge today.', 'info', 'creators', true);
