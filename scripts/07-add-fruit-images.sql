-- Add images to all fruits in the product database
-- This script updates the image_url and gallery_urls for each fruit product

-- Update Pomegranates (main product)
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%pomegranate%';

-- Update Mangoes
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%mango%' AND name NOT ILIKE '%alphonso%';

-- Update Oranges
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%orange%';

-- Update Lemons
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%lemon%';

-- Update Limes
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%lime%';

-- Update Grapefruits
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%grapefruit%';

-- Update Pineapples
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%pineapple%';

-- Update Bananas
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%banana%';

-- Update Papayas
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%papaya%';

-- Update Coconuts
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%coconut%';

-- Update Guavas
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%guava%';

-- Update Jackfruits
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%jackfruit%';

-- Update Dragon Fruits
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%dragon%';

-- Update Kiwis
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%kiwi%';

-- Update Watermelons
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%watermelon%';

-- Update Grapes
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%grape%';

-- Update Strawberries
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%strawberry%' OR name ILIKE '%strawberries%';

-- Update Blueberries
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%blueberry%' OR name ILIKE '%blueberries%';

-- Update Blackberries
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%blackberry%' OR name ILIKE '%blackberries%';

-- Update Cherries
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%cherry%' OR name ILIKE '%cherries%';

-- Update Plums
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE name ILIKE '%plum%';

-- Update any remaining products without images
UPDATE products 
SET image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400',
        '/placeholder.svg?height=400&width=400'
    ]
WHERE image_url IS NULL OR image_url = '';

-- Verify the update
SELECT name, image_url, array_length(gallery_urls, 1) as gallery_count 
FROM products 
WHERE is_active = true 
ORDER BY name;
