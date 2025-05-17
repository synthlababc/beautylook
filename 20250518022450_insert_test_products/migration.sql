-- Insert test products
INSERT INTO "Product" (name, description, price, currency, status, image, "categoryId", "createdAt", "updatedAt")
VALUES 
('AeroTune X9', 'Wireless headset with quantum bass technology', 39.99, 'USD', 'HOT', 'https://example.com/speaker1.jpg', 1, NOW(), NOW()),
('SoundBlast Pro', 'Premium wireless headphones with noise cancellation', 199.99, 'USD', 'NEW', 'https://example.com/speaker2.jpg', 1, NOW(), NOW());

-- Insert test category
INSERT INTO "Category" (name) VALUES ('Headphones');
