import express from 'express';
import { testConnection } from './config/config';
import cors from 'cors';
import { registerUser } from './api/auth';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port: number = process.env.PORT ? Number(process.env.PORT) : 8000;

app.get('/', (req, res) => {
    res.send('Hello, welcome to the backend!');
});

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

