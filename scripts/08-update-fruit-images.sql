-- Update all existing products with proper fruit images
-- This script adds main images and gallery images to all fruits in the database

-- Update Pomegranates (main product)
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE name ILIKE '%pomegranate%';

-- Update Mangoes
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE name ILIKE '%mango%';

-- Update Oranges
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE name ILIKE '%orange%';

-- Update Grapes
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE name ILIKE '%grape%';

-- Update Bananas
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE name ILIKE '%banana%';

-- Update Lemons
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE name ILIKE '%lemon%';

-- Update Pineapples
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE name ILIKE '%pineapple%';

-- Update Watermelons
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE name ILIKE '%watermelon%';

-- Update Coconuts
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE name ILIKE '%coconut%';

-- Update Papayas
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE name ILIKE '%papaya%';

-- Update any remaining products without images
UPDATE products 
SET 
    image_url = '/placeholder.svg?height=400&width=400',
    gallery_urls = ARRAY[
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
    ]
WHERE image_url IS NULL OR image_url = '';

-- Verify the update
SELECT name, image_url, array_length(gallery_urls, 1) as gallery_count 
FROM products 
WHERE is_active = true 
ORDER BY name;
