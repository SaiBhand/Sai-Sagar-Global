-- Remove specific fruits from the products table
-- This script removes the fruits that are not wanted in the product catalog

-- Delete specific fruits by exact name matching
DELETE FROM products WHERE name = 'Fresh Apricots';
DELETE FROM products WHERE name = 'Fresh Avocados';
DELETE FROM products WHERE name = 'Fresh Cantaloupes';
DELETE FROM products WHERE name = 'Fresh Dates';
DELETE FROM products WHERE name = 'Fresh Figs';
DELETE FROM products WHERE name = 'Fresh Honeydew Melons';
DELETE FROM products WHERE name = 'Fresh Litchis';
DELETE FROM products WHERE name = 'Fresh Longans';
DELETE FROM products WHERE name = 'Fresh Passion Fruits';
DELETE FROM products WHERE name = 'Fresh Peaches';
DELETE FROM products WHERE name = 'Fresh Pomelos';
DELETE FROM products WHERE name = 'Fresh Rambutan';
DELETE FROM products WHERE name = 'Fresh Raspberries';
DELETE FROM products WHERE name = 'Fresh Sapota';
DELETE FROM products WHERE name = 'Fresh Star Fruits';
DELETE FROM products WHERE name = 'Fresh Tangerines';
DELETE FROM products WHERE name = 'Premium Alphonso Mangoes';

-- Also remove any variations with different casing or spacing
DELETE FROM products WHERE LOWER(name) LIKE '%apricot%';
DELETE FROM products WHERE LOWER(name) LIKE '%avocado%';
DELETE FROM products WHERE LOWER(name) LIKE '%cantaloupe%';
DELETE FROM products WHERE LOWER(name) LIKE '%honeydew%';
DELETE FROM products WHERE LOWER(name) LIKE '%litchi%' OR LOWER(name) LIKE '%lychee%';
DELETE FROM products WHERE LOWER(name) LIKE '%longan%';
DELETE FROM products WHERE LOWER(name) LIKE '%passion fruit%';
DELETE FROM products WHERE LOWER(name) LIKE '%peach%';
DELETE FROM products WHERE LOWER(name) LIKE '%pomelo%';
DELETE FROM products WHERE LOWER(name) LIKE '%rambutan%';
DELETE FROM products WHERE LOWER(name) LIKE '%raspberry%';
DELETE FROM products WHERE LOWER(name) LIKE '%sapota%';
DELETE FROM products WHERE LOWER(name) LIKE '%star fruit%';
DELETE FROM products WHERE LOWER(name) LIKE '%tangerine%';
DELETE FROM products WHERE LOWER(name) LIKE '%alphonso%';

-- Show remaining products count
SELECT COUNT(*) as remaining_products FROM products WHERE is_active = true;

-- Show remaining product names for verification
SELECT name FROM products WHERE is_active = true ORDER BY name;
