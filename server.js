const express = require('express');
const app = express();
app.use(express.json());    
app.use(express.urlencoded({extended: false})); 

app.listen(8000, () => {
    console.log('Server Started On Port 8000');
});