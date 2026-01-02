import { createClient } from '@supabase/supabase-js'

// Αντικατάστησε τα παρακάτω με τα δικά σου στοιχεία από το Supabase
const supabaseUrl = 'https://oimymdvt...supabase.co' 
const supabaseKey = 'sb_publishable_1Jqca...' 

export const supabase = createClient(supabaseUrl, supabaseKey)