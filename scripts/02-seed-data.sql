-- Seed data for Sai Sagar Global

-- Insert company information
INSERT INTO company_info (key, value_en, value_hi, value_gu, category) VALUES
('company_name', 'Sai Sagar Global', 'साई सागर ग्लोबल', 'સાઈ સાગર ગ્લોબલ', 'basic'),
('tagline', 'Premium Fruit Exports Worldwide', 'विश्वव्यापी प्रीमियम फल निर्यात', 'વિશ્વવ્યાપી પ્રીમિયમ ફળ નિકાસ', 'basic'),
-- Updated phone number to 9730456181
('phone', '+91 9730456181', '+91 9730456181', '+91 9730456181', 'contact'),
('email', 'info@saisagarglobal.com', 'info@saisagarglobal.com', 'info@saisagarglobal.com', 'contact'),
-- Updated WhatsApp number to match new phone number
('whatsapp', '+91 9730456181', '+91 9730456181', '+91 9730456181', 'contact'),
('address', 'Mumbai, Maharashtra, India', 'मुंबई, महाराष्ट्र, भारत', 'મુંબઈ, મહારાષ્ટ્ર, ભારત', 'contact'),
('about_short', 'Leading exporter of premium quality fruits from India to global markets with 15+ years of experience.', 'भारत से वैश्विक बाजारों में प्रीमियम गुणवत्ता वाले फलों का अग्रणी निर्यातक, 15+ वर्षों का अनुभव।', '15+ વર્ષના અનુભવ સાથે ભારતથી વૈશ્વિક બજારોમાં પ્રીમિયમ ગુણવત્તાવાળા ફળોના અગ્રણી નિકાસકર્તા।', 'about');

-- Insert sample products
-- Reordered products to make pomegranates the main featured product
INSERT INTO products (name, name_hi, name_gu, description, description_hi, description_gu, category, origin_country, harvest_season, shelf_life, packaging_options, min_order_quantity, price_per_unit, image_url, is_featured) VALUES
('Premium Pomegranates', 'प्रीमियम अनार', 'પ્રીમિયમ દાડમ', 'World-class pomegranates from Maharashtra, known for their exceptional taste, deep red color, and high antioxidant content. Perfect for international markets.', 'महाराष्ट्र के विश्व स्तरीय अनार, अपने असाधारण स्वाद, गहरे लाल रंग और उच्च एंटीऑक्सीडेंट सामग्री के लिए जाने जाते हैं। अंतर्राष्ट्रीय बाजारों के लिए उपयुक्त।', 'મહારાષ્ટ્રના વિશ્વ સ્તરીય દાડમ, તેમના અસાધારણ સ્વાદ, ઊંડા લાલ રંગ અને ઉચ્ચ એન્ટીઑક્સીડન્ટ સામગ્રી માટે જાણીતા છે। આંતરરાષ્ટ્રીય બજારો માટે યોગ્ય।', 'Pomegranates', 'India', 'October - February', '15-20 days', ARRAY['2kg boxes', '5kg boxes', '10kg cartons'], 200, 5.50, '/placeholder.svg?height=300&width=400', true),
('Fresh Alphonso Mangoes', 'ताजे अल्फांसो आम', 'તાજા અલ્ફાન્સો આમ', 'Renowned Alphonso mangoes from Ratnagiri, known for their exceptional sweetness and aroma.', 'रत्नागिरी के प्रसिद्ध अल्फांसो आम, अपनी असाधारण मिठास और सुगंध के लिए जाने जाते हैं।', 'રત્નાગિરીના પ્રસિદ્ધ અલ્ફાન્સો આમ, તેમની અસાધારણ મીઠાશ અને સુગંધ માટે જાણીતા છે।', 'Mangoes', 'India', 'April - June', '7-10 days', ARRAY['5kg boxes', '10kg boxes', 'Bulk packaging'], 100, 8.50, '/placeholder.svg?height=300&width=400', true),
('Organic Bananas', 'जैविक केले', 'ઓર્ગેનિક કેળા', 'Certified organic bananas, naturally ripened and perfect for international markets.', 'प्रमाणित जैविक केले, प्राकृतिक रूप से पके हुए और अंतर्राष्ट्रीय बाजारों के लिए उपयुक्त।', 'પ્રમાણિત ઓર્ગેનિક કેળા, કુદરતી રીતે પાકેલા અને આંતરરાષ્ટ્રીય બજારો માટે યોગ્ય।', 'Bananas', 'India', 'Year-round', '5-7 days', ARRAY['13kg boxes', 'Bulk containers'], 500, 2.80, '/placeholder.svg?height=300&width=400', false),
('Premium Grapes', 'प्रीमियम अंगूर', 'પ્રીમિયમ દ્રાક્ષ', 'Sweet and seedless grapes, available in green and black varieties.', 'मीठे और बीज रहित अंगूर, हरी और काली किस्मों में उपलब्ध।', 'મીઠી અને બીજ વિનાની દ્રાક્ષ, લીલી અને કાળી જાતોમાં ઉપલબ્ધ।', 'Grapes', 'India', 'December - April', '10-14 days', ARRAY['4.5kg boxes', '9kg boxes'], 300, 6.75, '/placeholder.svg?height=300&width=400', true);

-- Insert sample buyers
INSERT INTO buyers (company_name, contact_person, email, phone, country, city, business_type, products_interested, annual_volume, is_verified) VALUES
('Global Fruits LLC', 'John Smith', 'john@globalfruits.com', '+1-555-0123', 'USA', 'New York', 'Importer', ARRAY['Mangoes', 'Pomegranates'], 50000, true),
('European Fresh Market', 'Maria Garcia', 'maria@europeanfresh.eu', '+49-123-456789', 'Germany', 'Berlin', 'Distributor', ARRAY['Grapes', 'Bananas'], 75000, true),
('Middle East Trading Co.', 'Ahmed Al-Rashid', 'ahmed@metradingco.ae', '+971-50-1234567', 'UAE', 'Dubai', 'Wholesaler', ARRAY['Mangoes', 'Pomegranates', 'Grapes'], 100000, true);
