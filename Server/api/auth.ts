// FILE: src/api/auth.ts
// import { supabase } from '../';
import { assert } from '../auth/assertion';
import { attest } from '../auth/attestation';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// export const signUp = async (email: string, password: string) => {
//   const { data, error } = await supabase.auth.signUp({ email, password });
//   if (error) throw error;

//   const { user } = data;
//   assert(user !== null, 'User registration failed');

//   // TypeScript type guard to ensure 'user' is not null
//   if (!user) {
//     throw new Error('User registration failed');
//   }

//   const { error: dbError } = await supabase
//     .from('users')
//     .insert([{ id: user.id, email: user.email, password: password }]);

//   if (dbError) throw dbError;

//   return data;
// };

// export const login = async (email: string, password: string) => {
//   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) throw error;
//   return data;
// };

export const registerUser = async (email: string, password: string) => {
  const response = await fetch(`http://localhost:8000/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  // console.log('email:', email, 'password:', password)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to register user');
  }

  return await response.json();
};

export default registerUser;