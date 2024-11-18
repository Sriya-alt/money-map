import express from 'express';
import { testConnection } from './config/config';
// import cors from 'cors';


const app = express();
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port: number = process.env.PORT ? Number(process.env.PORT) : 8000;

app.get('/', (req, res) => {
    res.send('Hello, welcome to the backend!');
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    // Handle registration logic here
    res.status(200).send({ message: 'User registered successfully' });
  });

app.listen(port, async() => {
    console.log(`Server Started On Port ${port}`);
    await testConnection(); // This will test the connection to the database
});

