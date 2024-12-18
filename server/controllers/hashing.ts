import { genSalt, hash, compare } from 'bcrypt';
import {createHash} from 'crypto';

const saltRounds = 10;

export function hashEmail(email: string): string{
    const hash = createHash('sha256').update(email + saltRounds).digest('hex');  // Hash the email with the salt
    return hash;
}

export async function hashPassword(password: string): Promise<string> {
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}

export async function validate(psswd: string, storedHash: string): Promise<boolean>{
    // Check if the plain password matches the stored hash
    const isValid = await compare(psswd, storedHash);
    return isValid;
}
export async function hashCheck(email: string, password: string) {
    // Hash the password and email
    const hashedPassword = await hashPassword(password);
    const hashedEmail = hashEmail(email);
  
    // Check hashedPassword and hashedEmail
    console.log(`Hashed Password: ${hashedPassword}`);
    console.log(`Hashed Email: ${hashedEmail}`);
}

export function compareEmailWithHash(email: string, hash: string, salt: string): boolean {
    const hashToCompare = createHash('sha256').update(email + salt).digest('hex');
    return hash === hashToCompare;
}