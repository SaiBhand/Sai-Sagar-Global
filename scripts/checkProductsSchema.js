require('dotenv').config({ path: '.env.local' })
const { supabase } = require('../lib/supabase/supabaseclient')

async function checkProductsSchema() {
    const { data, error } = await supabase.rpc('pg_catalog.pg_table_def', {
        tablename: 'products',
    })

    if (error) {
        console.error('Error fetching schema:', error)
        return
    }

    console.log('Products table columns:', data)
}

checkProductsSchema()