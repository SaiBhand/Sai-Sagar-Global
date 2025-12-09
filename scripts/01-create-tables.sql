-- Create tables for Sai Sagar Global Export-Import Business

-- Products table for fruit catalog
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255), -- Hindi translation
  name_gu VARCHAR(255), -- Gujarati translation
  description TEXT,
  description_hi TEXT,
  description_gu TEXT,
  category VARCHAR(100) NOT NULL,
  origin_country VARCHAR(100),
  harvest_season VARCHAR(100),
  shelf_life VARCHAR(100),
  packaging_options TEXT[],
  min_order_quantity INTEGER,
  price_per_unit DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  image_url TEXT,
  gallery_urls TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buyers directory table
CREATE TABLE IF NOT EXISTS buyers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  address TEXT,
  business_type VARCHAR(100), -- Wholesaler, Retailer, Distributor, etc.
  products_interested TEXT[], -- Array of product categories
  annual_volume INTEGER, -- Estimated annual purchase volume
  preferred_payment_terms VARCHAR(100),
  certifications_required TEXT[],
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inquiries table for contact form submissions
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  country VARCHAR(100),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  inquiry_type VARCHAR(50) DEFAULT 'general', -- general, product, partnership, etc.
  product_id UUID REFERENCES products(id),
  status VARCHAR(50) DEFAULT 'new', -- new, in_progress, resolved, closed
  priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
  assigned_to VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  country VARCHAR(100),
  interests TEXT[], -- Array of product categories they're interested in
  language_preference VARCHAR(5) DEFAULT 'en', -- en, hi, gu
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Company information table (for dynamic content management)
CREATE TABLE IF NOT EXISTS company_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value_en TEXT,
  value_hi TEXT,
  value_gu TEXT,
  category VARCHAR(50), -- contact, about, certifications, etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_buyers_country ON buyers(country);
CREATE INDEX IF NOT EXISTS idx_buyers_verified ON buyers(is_verified);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscriptions(is_active);
