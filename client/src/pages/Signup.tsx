import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the navigate hook

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSignup = () => {
    // Placeholder: Add your signup logic here
    console.log({ name, email, password, dateOfBirth, phoneNumber });

    // After saving the user information, navigate to the next page
    navigate('/questions/debt'); // Redirect to the first questionnaire page
  };

  return (
    <div className="signup-page">
      <div className="profile-header">
        <h1>FIRST LAST</h1>
        <p>usersemail@gmail.com</p>
        <p>+353 89 999 9999</p>
      </div>

      <div className="edit-profile">
        <h2>Edit Profile</h2>
      </div>

      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
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
        />
        <button onClick={handleSignup} className="save-changes-button" type="button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Signup;