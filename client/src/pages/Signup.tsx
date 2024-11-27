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

  const navigate = useNavigate(); // Initialize the navigate hook
  
  useEffect(() => {
    // Check if the form is complete every time any input changes
    const checkFormCompletion = async () => {
      const result = await checkInput(name, email, password, dateOfBirth, phoneNumber);
      setIsFormComplete(result);
    };

    checkFormCompletion();
  }, [name, email, password, dateOfBirth, phoneNumber]); 

  const handleSignup = () => {
    // Placeholder: Add your signup logic here
    console.log({ name, email, password, dateOfBirth, phoneNumber });

    // After saving the user information, navigate to the next page
    navigate('/questions/debt'); // Redirect to the first questionnaire page
  };

  return (
    <div className="signup-page">
      <div className="profile-header">
        <h1>Create Account</h1>
      </div>

      <form className="signup-form" method="POST" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" 
          placeholder="Name"
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
          onChange={(e) => setPhoneNumber(e.target.value)}
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
          disabled={!isFormComplete}
        >
          Sign-Up
        </button>
      </form>
    </div>
  );
};

export default Signup;