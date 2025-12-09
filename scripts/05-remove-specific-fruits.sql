-- Remove specified fruits from the product list
-- Removing 17 specific fruits as requested by user

DELETE FROM products WHERE name_en IN (
  'Fresh Apricots',
  'Fresh Avocados', 
  'Fresh Cantaloupes',
  'Fresh Dates',
  'Fresh Figs',
  'Fresh Honeydew Melons',
  'Fresh Litchis',
  'Fresh Longans',
  'Fresh Passion Fruits',
  'Fresh Peaches',
  'Fresh Pomelos',
  'Fresh Rambutan',
  'Fresh Raspberries',
  'Fresh Sapota',
  'Fresh Star Fruits',
  'Fresh Tangerines',
  'Premium Alphonso'
);

-- Verify remaining products count
SELECT COUNT(*) as remaining_products FROM products;
