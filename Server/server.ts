import express from 'express';
import signupRouter from './routes/signup';
import loginRouter from './routes/login';
import cors from 'cors';
import dotenv from 'dotenv';
import registerUser from './api/auth';
//import profileRouter from './routes/profile';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();
const port = process.env.PORT;

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
//app.use('/profile', profileRouter);

/* app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await registerUser(email, password);
      console.log(`User registered with email: ${email}`);
      res.status(200).send({ message: 'User registered successfully', user });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
});*/
app.listen(port, async() => {
    console.log(`Server Started On Port ${port}`);
});
