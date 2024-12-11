import supabase from "../config/config";
import { UserUpdates } from "./types";
import { Budget } from "./types";
import { BudgetController } from "./BudgetController";

async function createUserDetails(email: string, password: string, name: string, phone: string, dob: Date){
    try {
        const {data, error} = await supabase.from('users').insert([{email: email, password: password, name: name, phone: phone, dob: dob}]).select();
        if(error){
            console.error('Error creating users:', error);
        } else {
            console.log('User Created', data);
            const user_id = data[0].id
            const blankbudget: Budget = {
                id: user_id,
                budget: {},
                transactions: {},
                address: {}
            };
            BudgetController.createBudget(blankbudget);
        }
    } catch (error){
        console.log(error);
    }
}

async function getUserDetails(id: string){
    try{
        const {data, error} = await supabase.from('users').select().eq('id', id);
        if(error){
            console.error('error retrieving id:', error);
            return null;
        } else if (data.length === 0){
            console.warn("No user found with provided ID");
            return null;
        } else {
            console.log(data[0]);
            return data[0];
        }
    } catch (error){
        console.log(error);
    }
}

async function getUserbyEmail(email : string){
    try{
        const {data, error} = await supabase.from('users').select().eq('email', email);
        if(error){
            console.error('error retrieving email:', error);
            return null;
        } else if (data.length === 0){
            console.warn("No user found with provided Email");
            return null;
        } else {
            console.log(data[0]);
            return data[0];
        }
    } catch (error){
        console.log(error);
    }
}

async function deleteUserById(id: string){
    try{
        //CHECK IF ID EXISTS
        const {data, error} = await supabase.from('users').select().eq('id', id);
        if(error){
            console.error('error retrieving id:', error);
            return null;
        } else {
            const userId = data[0].id;
            try{
                //DELETES USER
                const {data, error} = await supabase.from('users').delete().eq('id', userId);
                if(error){
                    console.error('error deleting user:', error);
                } else {
                    return true;
                }
            } catch (err){
                console.error('Unexpected error:', err);
            }
        }
    } catch (err) {
        console.error('Unexpected error:', err)
    }
}

async function updateUserDetails(userId: string, updates: UserUpdates){
    try {
        const {data, error} = await supabase.from('users').update(updates).eq('id', userId);
        if(error){
            console.error(error);
            return null;
        } else {
            console.log("User Updated ", data);
            return data;
        }
    } catch (err){
        console.error(err);
    }
}

export const UserControllers = {
    createUserDetails,
    getUserDetails,
    deleteUserById,
    updateUserDetails,
    getUserbyEmail
}