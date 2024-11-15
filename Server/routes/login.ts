import express from 'express';
import supabase from "../config/config";

const router = express();
//const {users,...} = require('../db');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    try{
        if(req.body.button === 'login'){

            const email = req.body.email;
            const psswd = req.body.psswd;


            const script = `
                <script>
                    alert('Login Successfull!');
                    window.location.href = '/';
                </script>
            `;

            //Successful status and exec script
            res.status(200).send(script);
        }
    }catch(error){
        console.error('Error Registering:', error);
        res.status(400).send('Error Registering');
    }
});

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