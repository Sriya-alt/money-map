import express from 'express';
import supabase from "../config/config";

const router = express();

router.get('/', (req, res) => {
    res.render('profile');
});

router.post('/', (req, res) => {
    try{
        if(req.body.button === '  '){
            //include salt hash///
            const email = req.body.email;
            const passwd = req.body.passowrd;

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
        console.error('Error Loading Profile:', error);
        res.status(400).send('Error Loading Profile:');
    }
});

export default router;

//defaul user profile page 
//need update page for changing any credentials
//possibly business page too