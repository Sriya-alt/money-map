import express from 'express';
import supabase from "../config/config";

const router = express.Router();
//const {users,...} = require('../db');

router.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Signup</title>
            <style>
                /* Default dark theme styles */
                body {
                    background-color: black;  /* Set the background to black */
                    color: white;              /* Set the text color to white */
                    font-family: Arial, sans-serif; /* Optional: Set a font family */
                    margin: 0;                /* Remove default margin */
                    padding: 20px;            /* Add some padding */
                    transition: background-color 0.3s, color 0.3s; /* Smooth transition */
                }
                /* Light mode styles */
                body.light {
                    background-color: white;   /* Set background to white */
                    color: black;              /* Set text color to black */
                }
                h1 {
                    text-align: center;        /* Center align the heading */
                }
                form {
                    max-width: 400px;         /* Set a max width for the form */
                    margin: 0 auto;           /* Center the form horizontally */
                    display: flex;            /* Use flexbox for layout */
                    flex-direction: column;    /* Stack the input fields vertically */
                    gap: 10px;                /* Space between fields */
                }
                input {
                    padding: 10px;            /* Add padding to input fields */
                    border: 1px solid #555;   /* Dark border color */
                    border-radius: 5px;       /* Rounded corners */
                    background-color: #333;   /* Dark background for input */
                    color: white;              /* Text color in input */
                }
                input.light {
                    background-color: #eee;   /* Light background for input */
                    color: black;              /* Text color in input */
                }
                button {
                    padding: 10px;            /* Add padding to button */
                    background-color: #007BFF; /* Bootstrap primary color */
                    color: white;              /* Text color in button */
                    border: none;              /* No border */
                    border-radius: 5px;       /* Rounded corners */
                    cursor: pointer;           /* Pointer cursor on hover */
                }
                button:hover {
                    background-color: #0056b3; /* Darker shade on hover */
                }
                .toggle-button {
                    margin: 20px auto;        /* Center the toggle button */
                    display: block;           /* Make it block-level */
                    padding: 10px 20px;       /* Add padding to button */
                    background-color: #444;    /* Dark button color */
                    color: white;              /* Text color */
                    border: none;              /* No border */
                    border-radius: 5px;       /* Rounded corners */
                    cursor: pointer;           /* Pointer cursor on hover */
                    transition: background-color 0.3s; /* Smooth transition */
                }
                .toggle-button:hover {
                    background-color: #666;   /* Lighter shade on hover */
                }
            </style>
        </head>
        <body>
            <h1>Signup Page</h1>
            <button class="toggle-button" id="toggleTheme">CLICK ME</button>
            <form action="/signup" method="POST">
                <input type="email" name="email" placeholder="Email" required>
                <button type="submit" name="button" value="signup">Sign Up</button>
            </form>
            <script>
                const toggleButton = document.getElementById('toggleTheme');
                toggleButton.addEventListener('click', () => {
                    document.body.classList.toggle('light'); // Toggle the light class
                    const isLightMode = document.body.classList.contains('light');
                    toggleButton.textContent = isLightMode ? 'Switch to Dark Mode' : 'CAUGHT LACKING';
                    const inputs = document.querySelectorAll('input');
                    inputs.forEach(input => {
                        input.classList.toggle('light'); // Toggle light mode styles for inputs
                    });
                });
            </script>
        </body>
        </html>
    `);
});

router.post('/', async (req, res) => {
    try{
        if(req.body.button === 'signup'){
           // const uname = req.body.username;

           //salt hashing needed...
            const passwd = req.body.password;
            const email = req.body.email;
          
            
            const script = `
                <script>
                    alert('Registered Successfully!');
                    window.location.href = '/login';
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

async function insertUser(passwd: string, email: string){
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([
            {passwd: passwd, email: email}, 
        ])
        .select();

        if(error){
            console.error('Error Inserting User:', error.message);
            return null;
        }
        return data;
    }catch(err){
        console.error('Unexpected error:', err);
        return null;
    }
}

// Example usage of the insertUser function
/* insertUser('john.doe@5645.com').then(user => {
    if (user) {
        console.log('User inserted successfully:', user);
    } else {
        console.log('User insertion failed.');
    }
});
 */
export default router;