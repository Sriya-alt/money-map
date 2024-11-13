/*

THIS IS FOR DATABASE CONFIGURATION AND CONNECTION SUCH AS URL, PORT, DATABASE NAME, USERNAME, PASSWORD, ETC.


WE NEED TO CREATE A CONFIG FILE TO STORE ALL THE DATABASE CONFIGURATIONS.
*/ 

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

// Load the .env file
dotenv.config();

//Database Connection Vars.
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_API || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;