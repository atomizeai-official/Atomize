import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(url, anonKey)

async function checkDatabase() {
    console.log("Checking tables...")
    const { data: users, error: err } = await supabase.from('users').select('*')
    if (err) {
        console.error("Error fetching users:", err.message)
    } else {
        console.log("Users in public.users table:", users)
    }
}
checkDatabase()
