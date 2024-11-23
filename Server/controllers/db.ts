import supabase from "../config/config";
import {hashEmail, hashPassword} from "./hashing";
import { User } from "../api/auth"
export async function insertUser(name: string, email: string, psswd: string, phoneNumber: string, dob: Date) {
    try {
        const emailHash = await hashEmail(email.toLowerCase());
        const psswdHash = await hashPassword(psswd);

        const { data, error } = await supabase
            .from('users')
            .insert([
            {name: capitalizeWords(name), email: emailHash, password: psswdHash, phone: phoneNumber, dob: dob}, 
        ])
        .select();
        if(data){
            console.log('Successfully Created User: ', data);   
        }else{
            console.error('Error inserting user:', error.message);
            return null;
        }
        return data;
    } catch (err) {
        console.error('Unexpected error:', err);
        return null;
    }
}

//how to encode and decode the passwd so it can always be compared when needed for login.
export async function searchPassword(psswd: string): Promise<object[] | null>{
    try{
        const {data, error} = await supabase
            .from('users')
            .select('*') // Adjust fields based on what you need
            .eq('password', psswd);

        if(error){
            console.error('Credentials Incorrect: ', error.message);
            return null;
        }
        return data;
    }catch (err){
        console.error('Unexpected error:', err);
        return null;
    }
}
//
export async function searchUser(email: string): Promise<User[]> {
  try {
    const hash = await hashEmail(email);
    const { data, error } = await supabase
      .from('users')
      .select('*') // Adjust fields based on what you need
      .eq('email', hash); // Filters records with a matching email

    if (error) {
      console.error('Credentials Incorrect: ', error.message);
      return [];
    }
    return data as User[]; // Type assertion to ensure the correct type
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

function capitalizeWords(str: string): string {
    return str
        .trim() // Remove leading and trailing spaces
        .split(/\s+/) // Split by one or more spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and make the rest lowercase
        .join(' ');
}