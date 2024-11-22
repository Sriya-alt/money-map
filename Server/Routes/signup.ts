import express from 'express';
import { insertUser } from '../controllers/db';
/* import {registerUser} from './api/auth'; */

const router = express.Router();
//const {users,...} = require('../db');

router.post('/', async (req, res) => {
    const { name, email, password, phoneNumber, dob} = req.body;

    try {
        // Validate required fields
        if (!email || !password) {
            res.status(400).json({ success: false, error: 'All fields are required.' });
            return;
        }

        // Insert user into database
        const user = await insertUser(name, email, password, phoneNumber, dob);

        if (user) {
            res.status(201).json({ success: true, message: 'User registered successfully.' });
            return;
        } else {
            res.status(500).json({ success: false, error: 'Failed to register user.' });
            return;
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: 'Server error.' });
        return;
    }
});

//CHECK FUNCTION FOR HASHING
//hashCheck("1234", "abc");
/* 
//TEST FUNCTION FOR INSERTING
async function create(){
    const user = await insertUser("qweq1122e12@gmail.com", "email");

async function insertUser(passwd: string, email: string){
    try{
        const {data, error} = await supabase
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
create(); */
//createUser();

/* const storedHashedPassword = 'hashed_password_from_database';
const userInputPassword = 'password_attempt_from_user';

bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
    if (err) {
        // Handle error
        console.error('Error comparing passwords:', err);
        return;
    }

if (result) {
    // Passwords match, authentication successful
    console.log('Passwords match! User authenticated.');
} else {
    // Passwords don't match, authentication failed
    console.log('Passwords do not match! Authentication failed.');
}
}); */

//validation
/* 
export async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
*/

//example usage
/* 
async function storeUserData(email: string, password: string) {
  // Hash the password and email
  const hashedPassword = await hashPassword(password);
  const hashedEmail = hashEmail(email);

  // Store hashedPassword and hashedEmail in your database
  console.log(`Hashed Password: ${hashedPassword}`);
  console.log(`Hashed Email: ${hashedEmail}`);
}
*/

//validate to login
/* 
async function login(email: string, password: string, storedHashedPassword: string) {
  const isPasswordCorrect = await validatePassword(password, storedHashedPassword);

  if (isPasswordCorrect) {
    console.log("Login successful");
  } else {
    console.log("Invalid password");
  }
}
*/
export default router;