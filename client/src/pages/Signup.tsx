import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the navigate hook

async function checkInput(name: string, email: string, psswd: string, dob: string, phoneNum: string): Promise<boolean>{
  const isFormComplete = name && email && psswd && dob && phoneNum;
  if(isFormComplete){return true;}else{return false;}
}
const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize the navigate hook
  
  useEffect(() => {
    // Check if the form is complete every time any input changes
    const checkFormCompletion = async () => {
      const result = await checkInput(name, email, password, dateOfBirth, phoneNumber);
      setIsFormComplete(result);
    };

    checkFormCompletion();
  }, [name, email, password, dateOfBirth, phoneNumber]); 

  const handleSignup = async () => {
    try {
        const response = await fetch('http://localhost:8000/signup', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name,
            email,
            password,
            dob: dateOfBirth,
            phoneNumber,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Sign Up Success:', data);
          navigate('/questions/debt'); // Redirect to the first questionnaire page
        } else {
          const error = await response.json();
          setErrorMessage(error.error || 'Sign Up failed.'); // Display error message
        }
      } catch (error) {
          console.error('Error during Sign Up:', error);
          setErrorMessage('An unexpected error occurred. Please try again later.');
      }
  };

  return (
    <div className="signup-page">
      <div className="profile-header">
        <h1>Create Account</h1>
      </div>

      <form className="signup-form" method="POST" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" 
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value;
            // Allow only digits (0-9)
            if (/^\d*$/.test(value)) {
              setPhoneNumber(value);
            }
          }}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <button 
          onClick={handleSignup}
          className="save-changes-button"
          type="button"
        >
          Sign-Up
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Signup;