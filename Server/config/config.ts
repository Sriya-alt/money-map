/*

THIS IS FOR DATABASE CONFIGURATION AND CONNECTION SUCH AS URL, PORT, DATABASE NAME, USERNAME, PASSWORD, ETC.


WE NEED TO CREATE A CONFIG FILE TO STORE ALL THE DATABASE CONFIGURATIONS.
*/ 
/* SUPABASE_URL=https://ebarenbgefyzicoolpbg.supabase.co
SUPABASE_API=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYXJlbmJnZWZ5emljb29scGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxOTgwNTMsImV4cCI6MjA0NDc3NDA1M30.77976gFHWn14kP8IV0A0aKEdCrMlhNNEp5nSbcbrZjw 
 */
import { createClient } from '@supabase/supabase-js'
// Ensure the environment variables are defined
const supabaseUrl = 'https://ebarenbgefyzicoolpbg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYXJlbmJnZWZ5emljb29scGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxOTgwNTMsImV4cCI6MjA0NDc3NDA1M30.77976gFHWn14kP8IV0A0aKEdCrMlhNNEp5nSbcbrZjw ';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;