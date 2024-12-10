import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export interface User {
  id: string;
  email: string;
  password: string;
}

interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

// Extend the Request interface to include userID
declare module 'express-serve-static-core' {
  interface Request {
    userID?: string;
  }
}

export const generateToken = (user: { id: string; email: string }): string => {
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '0.5h' });
  console.log('Generated JWT Token:', token); // Log the generated token
  return token;
};

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(403).json({ error: 'Access Denied, No Token Provided' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Failed to authenticate token' });
      return;
    }
    const decodedToken = decoded as DecodedToken;
    req.userID = decodedToken.id;
    next();
  });
};