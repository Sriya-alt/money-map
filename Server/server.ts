import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port: number = process.env.PORT ? Number(process.env.PORT) : 8000;
<<<<<<< HEAD
app.listen(port, () => {
    console.log(`Server Started On Port ${port}`);
});
=======

app.get('/', (req, res) => {
    res.send('Hello, welcome to the backend!');
});

app.listen(port, () => {
    console.log(`Server Started On Port ${port}`);
});

>>>>>>> e5f8ddd5d5b965a33546800d52248c71ca9ff09a
