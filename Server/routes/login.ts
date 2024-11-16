import express from 'express';
import supabase from "../config/config";

const router = express();
//const {users,...} = require('../db');

/* router.get('/', (req, res) => {
    res.render('login');
}); */

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

export default router;