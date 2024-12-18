import express from 'express';
import supabase from "../config/config";
import { validate } from '../controllers/hashing';
import { searchUser } from '../controllers/db';
import { generateToken } from '../api/auth';
import { User } from '../api/auth';

const router = express.Router();
//const {users,...} = require('../db');

router.post('/', async (req, res) => {
    const { email, password} = req.body;
    try{
        if(!email || !password){
            res.status(400).json({ success: false, error: 'All fields are required.' });
            return;
        }

        const userData = await searchUser(email);
        var hashP = false;

        if(userData.length > 0 && userData != null){
            const pass = userData[0];
            hashP = await validate(password, String(pass.password));
        }

        if(hashP){
            console.log('User Found successfully:', userData);
            const user = userData[0];
            const token = generateToken({id: user.id, email: user.email});
            res.status(201).json({success: true, message: 'User Found Successfully.', token});
            return;
        }else{
            res.status(500).json({success: false, error: 'Wrong Email or Password.' });
            return;
        }
    }catch(error){
        console.error('Error During Login:', error);
        res.status(400).json({success: false, error: 'Server Error'});
        return;
    }
});

/*

    router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log("Received data:", { email, password });
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        const userData = await searchUser(email);
        
        var hashP = false;
        if (userData != null && userData.length > 0) {
            const user = userData[0];
            hashP = await validate(password, String(user.password));
            console.log(String(user.password));
        }
        if (hashP) {
            console.log('User Found successfully:', userData);
            return res.status(201).json({ message: 'User Found Successfully.' });
        } else {
            return res.status(500).json({ error: 'Failed to find user.' });
        }
    } catch (error) {
        console.error('Error During Login:', error);
        return res.status(400).json({ error: 'Server Error' });
    }
});
*/

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

export default router;