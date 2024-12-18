// FILE: src/api/auth.ts
// import {supabase} from '../supabaseClient.ts'; // Import for side effects only
// import dotenv from 'dotenv';


// Function to get the token from local storage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Function to remove the token from local storage (logout)
export const logout = () => {
  localStorage.removeItem('token');
  document.cookie = 'token=; Max-Age=0; path=/;'; // Delete the JWT token cookie
};