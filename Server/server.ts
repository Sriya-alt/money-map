import express from 'express';
import signupRouter from './routes/signup';
import loginRouter from './routes/login';
//import profileRouter from './routes/profile';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port: number = process.env.PORT ? Number(process.env.PORT) : 8000;

app.get('/', (req, res) => {
    res.send(`
        <style>
                /* Dark theme styles */
                body {
                    background-color: black;  /* Set the background to black */
                    color: light blue;              /* Set the text color to white */
                    font-family: Arial, sans-serif; /* Optional: Set a font family */
                    margin: 0;                /* Remove default margin */
                    padding: 20px;            /* Add some padding */
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
            </style>
    `);
});

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await registerUser(email, password);
      console.log(`User registered with email: ${email}`);
      res.status(200).send({ message: 'User registered successfully', user });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  });

app.listen(port, async() => {
    console.log(`Server Started On Port ${port}`);
    await testConnection(); // This will test the connection to the database
});
