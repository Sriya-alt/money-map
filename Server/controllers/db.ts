import supabase from "../config/config";
import {hashEmail, hashPassword} from "../controllers/hashing";

export async function insertUser(email: string, psswd: string) {
    try {
        const emailHash = await hashEmail(email);
        const psswdHash = await hashPassword(psswd);

        const { data, error } = await supabase
            .from('users')
            .insert([
            { email: emailHash, password: psswdHash}, 
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
async function searchDB(email: string, passwd: string){
    try{
        const {data, error} = await supabase
            .from('users')
            .insert([
            {password: passwd, email: email}, 
        ])
        .select();

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