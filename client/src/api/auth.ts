// FILE: src/api/auth.ts
// import {supabase} from '../supabaseClient.ts'; // Import for side effects only
import dotenv from 'dotenv';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const signUp = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to sign up');
  }

  return await response.json();
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to log in');
  }

  return await response.json();
};