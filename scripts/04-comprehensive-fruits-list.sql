-- Comprehensive fruits list with 50+ varieties for Sai Sagar Global
-- Adding extensive fruit varieties across all categories

INSERT INTO products (name, name_hi, name_gu, description, description_hi, description_gu, category, origin_country, harvest_season, shelf_life, packaging_options, min_order_quantity, price_per_unit, currency, image_url, is_featured, is_active) VALUES

-- Additional Citrus Fruits
('Fresh Grapefruits', 'ताजे चकोतरे', 'તાજા ચકોતરા', 'Large, juicy grapefruits with perfect balance of sweet and tart flavors, rich in vitamin C.', 'मीठे और खट्टे स्वाद के सही संतुलन वाले बड़े, रसदार चकोतरे, विटामिन सी से भरपूर।', 'મીઠા અને ખાટા સ્વાદના સાચા સંતુલન સાથે મોટા, રસાળ ચકોતરા, વિટામિન સીથી ભરપૂર।', 'Citrus', 'India', 'November - April', '21-30 days', ARRAY['8kg boxes', '15kg boxes'], 200, 4.20, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Tangerines', 'ताजे संतरे', 'તાજા સંતરા', 'Easy-to-peel tangerines with sweet, juicy segments perfect for snacking and export.', 'छीलने में आसान संतरे जिनमें मीठे, रसदार टुकड़े हैं जो नाश्ते और निर्यात के लिए उपयुक्त हैं।', 'છાલવામાં સરળ સંતરા જેમાં મીઠા, રસાળ ટુકડા છે જે નાસ્તા અને નિકાસ માટે યોગ્ય છે।', 'Citrus', 'India', 'October - February', '14-21 days', ARRAY['5kg boxes', '10kg boxes'], 180, 3.80, 'USD', '/placeholder.svg?height=300&width=400', false, true),

-- More Tropical Fruits
('Fresh Mangoes - Alphonso', 'ताजे आम - अल्फांसो', 'તાજા કેરી - અલ્ફાન્સો', 'King of mangoes - Alphonso variety with rich, creamy texture and unmatched sweetness.', 'आमों का राजा - अल्फांसो किस्म जिसमें समृद्ध, मलाईदार बनावट और बेजोड़ मिठास है।', 'કેરીનો રાજા - અલ્ફાન્સો જાત જેમાં સમૃદ્ધ, ક્રીમી ટેક્સચર અને અજોડ મિઠાસ છે।', 'Tropical', 'India', 'April - June', '7-10 days', ARRAY['4kg boxes', '8kg boxes'], 100, 8.50, 'USD', '/placeholder.svg?height=300&width=400', true, true),

('Fresh Mangoes - Kesar', 'ताजे आम - केसर', 'તાજા કેરી - કેસર', 'Premium Kesar mangoes with distinctive aroma and golden color, perfect for export markets.', 'विशिष्ट सुगंध और सुनहरे रंग वाले प्रीमियम केसर आम, निर्यात बाजारों के लिए उपयुक्त।', 'વિશિષ્ટ સુગંધ અને સુવર્ણ રંગ સાથે પ્રીમિયમ કેસર કેરી, નિકાસ બજારો માટે યોગ્ય।', 'Tropical', 'India', 'May - July', '7-10 days', ARRAY['4kg boxes', '8kg boxes'], 120, 7.80, 'USD', '/placeholder.svg?height=300&width=400', true, true),

('Fresh Mangoes - Totapuri', 'ताजे आम - तोतापुरी', 'તાજા કેરી - તોતાપુરી', 'Firm Totapuri mangoes ideal for processing and fresh consumption with excellent shelf life.', 'प्रसंस्करण और ताजा सेवन के लिए आदर्श मजबूत तोतापुरी आम जिनकी शेल्फ लाइफ उत्कृष्ट है।', 'પ્રોસેસિંગ અને તાજા સેવન માટે આદર્શ મજબૂત તોતાપુરી કેરી જેની શેલ્ફ લાઇફ ઉત્કૃષ્ટ છે।', 'Tropical', 'India', 'March - May', '10-14 days', ARRAY['6kg boxes', '12kg boxes'], 150, 6.20, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Bananas - Cavendish', 'ताजे केले - कैवेंडिश', 'તાજા કેળા - કેવેન્ડિશ', 'Premium Cavendish bananas with perfect ripeness and excellent taste for global markets.', 'वैश्विक बाजारों के लिए सही पकाव और उत्कृष्ट स्वाद वाले प्रीमियम कैवेंडिश केले।', 'વૈશ્વિક બજારો માટે સાચા પાકાવ અને ઉત્કૃષ્ટ સ્વાદ સાથે પ્રીમિયમ કેવેન્ડિશ કેળા।', 'Tropical', 'India', 'Year-round', '7-12 days', ARRAY['13kg boxes', '18kg boxes'], 300, 2.80, 'USD', '/placeholder.svg?height=300&width=400', true, true),

('Fresh Guavas', 'ताजे अमरूद', 'તાજા જામફળ', 'Aromatic guavas with high vitamin C content and sweet, fragrant flesh.', 'उच्च विटामिन सी सामग्री और मीठे, सुगंधित गूदे वाले सुगंधित अमरूद।', 'ઉચ્ચ વિટામિન સી સામગ્રી અને મીઠા, સુગંધિત ગૂદા સાથે સુગંધિત જામફળ।', 'Tropical', 'India', 'November - March', '5-7 days', ARRAY['5kg boxes', '10kg boxes'], 150, 3.20, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Jackfruits', 'ताजे कटहल', 'તાજા ફણસ', 'Large, sweet jackfruits with unique flavor and aroma, rich in nutrients and fiber.', 'अनोखे स्वाद और सुगंध वाले बड़े, मीठे कटहल, पोषक तत्वों और फाइबर से भरपूर।', 'અનોખા સ્વાદ અને સુગંધ સાથે મોટા, મીઠા ફણસ, પોષક તત્વો અને ફાઇબરથી ભરપૂર।', 'Tropical', 'India', 'March - August', '3-5 days', ARRAY['Individual packaging', 'Bulk containers'], 50, 4.80, 'USD', '/placeholder.svg?height=300&width=400', false, true),

-- Stone Fruits and Drupes
('Fresh Peaches', 'ताजे आड़ू', 'તાજા પીચ', 'Juicy peaches with velvety skin and sweet, aromatic flesh perfect for fresh markets.', 'मखमली त्वचा और मीठे, सुगंधित गूदे वाले रसदार आड़ू जो ताजा बाजारों के लिए उपयुक्त हैं।', 'મખમલી ત્વચા અને મીઠા, સુગંધિત ગૂદા સાથે રસાળ પીચ જે તાજા બજારો માટે યોગ્ય છે।', 'Stone Fruits', 'India', 'May - August', '5-7 days', ARRAY['3kg boxes', '6kg boxes'], 100, 9.50, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Apricots', 'ताजे खुबानी', 'તાજા જરદાળુ', 'Delicate apricots with golden color and sweet-tart flavor, rich in beta-carotene.', 'सुनहरे रंग और मीठे-खट्टे स्वाद वाले नाजुक खुबानी, बीटा-कैरोटीन से भरपूर।', 'સુવર્ણ રંગ અને મીઠા-ખાટા સ્વાદ સાથે નાજુક જરદાળુ, બીટા-કેરોટીનથી ભરપૂર।', 'Stone Fruits', 'India', 'May - July', '3-5 days', ARRAY['2kg boxes', '5kg boxes'], 80, 12.00, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Cherries', 'ताजे चेरी', 'તાજા ચેરી', 'Premium sweet cherries with deep red color and exceptional flavor for luxury markets.', 'लक्जरी बाजारों के लिए गहरे लाल रंग और असाधारण स्वाद वाली प्रीमियम मीठी चेरी।', 'લક્ઝરી બજારો માટે ઊંડા લાલ રંગ અને અસાધારણ સ્વાદ સાથે પ્રીમિયમ મીઠી ચેરી।', 'Stone Fruits', 'India', 'May - July', '7-10 days', ARRAY['1kg boxes', '2kg boxes'], 50, 18.50, 'USD', '/placeholder.svg?height=300&width=400', true, true),

-- Berries
('Fresh Blueberries', 'ताजे ब्लूबेरी', 'તાજા બ્લુબેરી', 'Antioxidant-rich blueberries with sweet flavor and excellent nutritional profile.', 'मीठे स्वाद और उत्कृष्ट पोषण प्रोफ़ाइल वाली एंटीऑक्सीडेंट से भरपूर ब्लूबेरी।', 'મીઠા સ્વાદ અને ઉત્કૃષ્ટ પોષણ પ્રોફાઇલ સાથે એન્ટીઑક્સીડન્ટથી ભરપૂર બ્લુબેરી।', 'Berries', 'India', 'December - February', '7-10 days', ARRAY['125g punnets', '500g boxes'], 25, 22.00, 'USD', '/placeholder.svg?height=300&width=400', true, true),

('Fresh Blackberries', 'ताजे ब्लैकबेरी', 'તાજા બ્લેકબેરી', 'Juicy blackberries with intense flavor and high vitamin content for premium markets.', 'प्रीमियम बाजारों के लिए तीव्र स्वाद और उच्च विटामिन सामग्री वाली रसदार ब्लैकबेरी।', 'પ્રીમિયમ બજારો માટે તીવ્ર સ્વાદ અને ઉચ્ચ વિટામિન સામગ્રી સાથે રસાળ બ્લેકબેરી।', 'Berries', 'India', 'January - March', '3-5 days', ARRAY['125g punnets', '250g boxes'], 20, 25.00, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Raspberries', 'ताजे रसभरी', 'તાજા રાસ્પબેરી', 'Delicate raspberries with sweet-tart flavor and beautiful red color for gourmet use.', 'गॉरमेट उपयोग के लिए मीठे-खट्टे स्वाद और सुंदर लाल रंग वाली नाजुक रसभरी।', 'ગોર્મેટ ઉપયોગ માટે મીઠા-ખાટા સ્વાદ અને સુંદર લાલ રંગ સાથે નાજુક રાસ્પબેરી।', 'Berries', 'India', 'December - February', '2-3 days', ARRAY['125g punnets', '250g boxes'], 15, 28.00, 'USD', '/placeholder.svg?height=300&width=400', false, true),

-- Exotic and Specialty Fruits
('Fresh Passion Fruits', 'ताजे पैशन फ्रूट', 'તાજા પેશન ફ્રૂટ', 'Aromatic passion fruits with intense flavor and fragrance, perfect for beverages and desserts.', 'तीव्र स्वाद और सुगंध वाले सुगंधित पैशन फ्रूट, पेय और मिठाइयों के लिए उपयुक्त।', 'તીવ્ર સ્વાદ અને સુગંધ સાથે સુગંધિત પેશન ફ્રૂટ, પીણાં અને મિઠાઈઓ માટે યોગ્ય।', 'Exotic', 'India', 'June - December', '7-10 days', ARRAY['1kg boxes', '2kg boxes'], 50, 16.50, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Avocados', 'ताजे एवोकाडो', 'તાજા એવોકાડો', 'Creamy avocados rich in healthy fats and nutrients, perfect for health-conscious markets.', 'स्वस्थ वसा और पोषक तत्वों से भरपूर मलाईदार एवोकाडो, स्वास्थ्य के प्रति जागरूक बाजारों के लिए उपयुक्त।', 'તંદુરસ્ત ચરબી અને પોષક તત્વોથી ભરપૂર ક્રીમી એવોકાડો, આરોગ્ય પ્રત્યે સભાન બજારો માટે યોગ્ય।', 'Exotic', 'India', 'Year-round', '7-14 days', ARRAY['4kg boxes', '10kg boxes'], 100, 11.20, 'USD', '/placeholder.svg?height=300&width=400', true, true),

('Fresh Star Fruits', 'ताजे स्टार फ्रूट', 'તાજા સ્ટાર ફ્રૂટ', 'Unique star-shaped fruits with crisp texture and mild sweet-tart flavor.', 'कुरकुरी बनावट और हल्के मीठे-खट्टे स्वाद वाले अनोखे तारे के आकार के फल।', 'કડક ટેક્સચર અને હળવા મીઠા-ખાટા સ્વાદ સાથે અનોખા તારાના આકારના ફળ।', 'Exotic', 'India', 'June - February', '5-7 days', ARRAY['2kg boxes', '5kg boxes'], 80, 8.80, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Rambutan', 'ताजे रामबुतान', 'તાજા રામબુતાન', 'Exotic rambutan with sweet, translucent flesh and unique hairy exterior.', 'मीठे, पारदर्शी गूदे और अनोखे बालों वाली बाहरी सतह वाला विदेशी रामबुतान।', 'મીઠા, પારદર્શક ગૂદા અને અનોખી વાળવાળી બાહ્ય સપાટી સાથે વિદેશી રામબુતાન।', 'Exotic', 'India', 'May - September', '3-5 days', ARRAY['1kg boxes', '2kg boxes'], 40, 19.50, 'USD', '/placeholder.svg?height=300&width=400', false, true),

-- Melons and Gourds
('Fresh Honeydew Melons', 'ताजे हनीड्यू खरबूजे', 'તાજા હનીડ્યુ ખરબૂજા', 'Sweet honeydew melons with pale green flesh and refreshing taste.', 'हल्के हरे गूदे और ताज़गी देने वाले स्वाद वाले मीठे हनीड्यू खरबूजे।', 'હળવા લીલા ગૂદા અને તાજગી આપનારા સ્વાદ સાથે મીઠા હનીડ્યુ ખરબૂજા।', 'Melons', 'India', 'April - August', '7-10 days', ARRAY['Individual packaging', '6-piece boxes'], 120, 3.20, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Cantaloupes', 'ताजे कैंटालूप', 'તાજા કેન્ટાલૂપ', 'Aromatic cantaloupes with orange flesh and sweet, musky flavor.', 'नारंगी गूदे और मीठे, कस्तूरी स्वाद वाले सुगंधित कैंटालूप।', 'નારંગી ગૂદા અને મીઠા, કસ્તુરી સ્વાદ સાથે સુગંધિત કેન્ટાલૂપ।', 'Melons', 'India', 'March - July', '5-7 days', ARRAY['Individual packaging', '4-piece boxes'], 100, 3.80, 'USD', '/placeholder.svg?height=300&width=400', false, true),

-- Grapes
('Fresh Green Grapes', 'ताजे हरे अंगूर', 'તાજા લીલા દ્રાક્ષ', 'Crisp green grapes with sweet flavor and excellent shelf life for export markets.', 'निर्यात बाजारों के लिए मीठे स्वाद और उत्कृष्ट शेल्फ लाइफ वाले कुरकुरे हरे अंगूर।', 'નિકાસ બજારો માટે મીઠા સ્વાદ અને ઉત્કૃષ્ટ શેલ્ફ લાઇફ સાથે કડક લીલા દ્રાક્ષ।', 'Grapes', 'India', 'January - March', '21-30 days', ARRAY['4.5kg boxes', '8kg boxes'], 200, 6.50, 'USD', '/placeholder.svg?height=300&width=400', true, true),

('Fresh Red Grapes', 'ताजे लाल अंगूर', 'તાજા લાલ દ્રાક્ષ', 'Sweet red grapes with beautiful color and excellent taste for premium markets.', 'प्रीमियम बाजारों के लिए सुंदर रंग और उत्कृष्ट स्वाद वाले मीठे लाल अंगूर।', 'પ્રીમિયમ બજારો માટે સુંદર રંગ અને ઉત્કૃષ્ટ સ્વાદ સાથે મીઠા લાલ દ્રાક્ષ।', 'Grapes', 'India', 'December - February', '21-30 days', ARRAY['4.5kg boxes', '8kg boxes'], 200, 7.20, 'USD', '/placeholder.svg?height=300&width=400', true, true),

('Fresh Black Grapes', 'ताजे काले अंगूर', 'તાજા કાળા દ્રાક્ષ', 'Rich black grapes with intense flavor and high antioxidant content.', 'तीव्र स्वाद और उच्च एंटीऑक्सीडेंट सामग्री वाले समृद्ध काले अंगूर।', 'તીવ્ર સ્વાદ અને ઉચ્ચ એન્ટીઑક્સીડન્ટ સામગ્રી સાથે સમૃદ્ધ કાળા દ્રાક્ષ।', 'Grapes', 'India', 'January - March', '21-30 days', ARRAY['4.5kg boxes', '8kg boxes'], 180, 7.80, 'USD', '/placeholder.svg?height=300&width=400', false, true),

-- Dried Fruits and Nuts (Fresh varieties)
('Fresh Dates', 'ताजे खजूर', 'તાજા ખજૂર', 'Premium fresh dates with natural sweetness and rich nutritional profile.', 'प्राकृतिक मिठास और समृद्ध पोषण प्रोफ़ाइल वाले प्रीमियम ताजे खजूर।', 'કુદરતી મિઠાસ અને સમૃદ્ધ પોષણ પ્રોફાઇલ સાથે પ્રીમિયમ તાજા ખજૂર।', 'Dates', 'India', 'September - December', '30-45 days', ARRAY['1kg boxes', '5kg boxes'], 100, 9.80, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Figs', 'ताजे अंजीर', 'તાજા અંજીર', 'Delicate fresh figs with sweet flavor and soft texture, perfect for gourmet markets.', 'गॉरमेट बाजारों के लिए मीठे स्वाद और नरम बनावट वाले नाजुक ताजे अंजीर।', 'ગોર્મેટ બજારો માટે મીઠા સ્વાદ અને નરમ ટેક્સચર સાથે નાજુક તાજા અંજીર।', 'Figs', 'India', 'June - September', '3-5 days', ARRAY['250g boxes', '1kg boxes'], 50, 15.50, 'USD', '/placeholder.svg?height=300&width=400', false, true),

-- Seasonal Specialties
('Fresh Custard Apples', 'ताजे सीताफल', 'તાજા સીતાફળ', 'Creamy custard apples with sweet, aromatic flesh and unique texture.', 'मीठे, सुगंधित गूदे और अनोखी बनावट वाले मलाईदार सीताफल।', 'મીઠા, સુગંધિત ગૂદા અને અનોખી ટેક્સચર સાથે ક્રીમી સીતાફળ।', 'Seasonal', 'India', 'August - November', '2-3 days', ARRAY['Individual packaging', '6-piece boxes'], 80, 5.50, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Wood Apples', 'ताजे बेल', 'તાજા બીલ', 'Traditional wood apples with hard shell and nutritious, tangy pulp inside.', 'कठोर खोल और अंदर पौष्टिक, तीखे गूदे वाले पारंपरिक बेल।', 'કઠોર શેલ અને અંદર પોષક, તીખા ગૂદા સાથે પરંપરાગત બીલ।', 'Traditional', 'India', 'March - June', '15-20 days', ARRAY['Individual packaging', '12-piece boxes'], 60, 4.20, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Sapota', 'ताजे चीकू', 'તાજા ચીકુ', 'Sweet sapota fruits with brown skin and sweet, grainy flesh rich in vitamins.', 'भूरी त्वचा और विटामिन से भरपूर मीठे, दानेदार गूदे वाले मीठे चीकू फल।', 'ભૂરી ત્વચા અને વિટામિનથી ભરપૂર મીઠા, દાણાદાર ગૂદા સાથે મીઠા ચીકુ ફળ।', 'Traditional', 'India', 'December - April', '3-5 days', ARRAY['2kg boxes', '5kg boxes'], 100, 3.80, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Jamun', 'ताजे जामुन', 'તાજા જામુન', 'Purple jamun fruits with sweet-astringent taste and numerous health benefits.', 'मीठे-कसैले स्वाद और कई स्वास्थ्य लाभों वाले बैंगनी जामुन फल।', 'મીઠા-કસેલા સ્વાદ અને અનેક આરોગ્ય લાભો સાથે જાંબુડા જામુન ફળ।', 'Traditional', 'India', 'June - August', '2-3 days', ARRAY['1kg boxes', '2kg boxes'], 50, 6.20, 'USD', '/placeholder.svg?height=300&width=400', false, true),

-- Citrus Varieties
('Fresh Pomelos', 'ताजे चकोतरे', 'તાજા ચકોતરા', 'Large pomelos with sweet, mild flavor and thick, easy-to-peel skin.', 'मीठे, हल्के स्वाद और मोटी, छीलने में आसान त्वचा वाले बड़े चकोतरे।', 'મીઠા, હળવા સ્વાદ અને જાડી, છાલવામાં સરળ ત્વચા સાથે મોટા ચકોતરા।', 'Citrus', 'India', 'November - February', '14-21 days', ARRAY['Individual packaging', '6-piece boxes'], 100, 5.80, 'USD', '/placeholder.svg?height=300&width=400', false, true),

-- Additional Tropical Varieties
('Fresh Litchis', 'ताजे लीची', 'તાજા લીચી', 'Delicate litchis with translucent, sweet flesh and floral aroma.', 'पारदर्शी, मीठे गूदे और फूलों की सुगंध वाली नाजुक लीची।', 'પારદર્શક, મીઠા ગૂદા અને ફૂલોની સુગંધ સાથે નાજુક લીચી।', 'Tropical', 'India', 'May - July', '3-5 days', ARRAY['1kg boxes', '2kg boxes'], 80, 8.50, 'USD', '/placeholder.svg?height=300&width=400', false, true),

('Fresh Longans', 'ताजे लोंगन', 'તાજા લોંગન', 'Sweet longans similar to litchis with translucent flesh and delicate flavor.', 'पारदर्शी गूदे और नाजुक स्वाद वाले लीची के समान मीठे लोंगन।', 'પારદર્શક ગૂદા અને નાજુક સ્વાદ સાથે લીચી જેવા મીઠા લોંગન।', 'Tropical', 'India', 'July - September', '5-7 days', ARRAY['1kg boxes', '2kg boxes'], 60, 12.50, 'USD', '/placeholder.svg?height=300&width=400', false, true);
