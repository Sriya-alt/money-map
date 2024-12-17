import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Layout from "../components/Layout";

async function checkInput(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  dob: string,
  phoneNum: string
): Promise<boolean> {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const isValidEmail = emailRegex.test(email);

  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const isOver18 =
    age > 18 || (age === 18 && today >= new Date(birthDate.setFullYear(today.getFullYear())));

  const passwordsMatch = password === confirmPassword;

  return !!(
    name &&
    isValidEmail &&
    password &&
    passwordsMatch &&
    isOver18 &&
    phoneNum
  );
}

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkFormCompletion = async () => {
      const result = await checkInput(
        name,
        email,
        password,
        confirmPassword,
        dateOfBirth,
        phoneNumber
      );
      setIsFormComplete(result);
      setError(null); 
    };

    checkFormCompletion();
  }, [name, email, password, confirmPassword, dateOfBirth, phoneNumber]);

  const handleSignup = async () => {
    const isValid = await checkInput(
      name,
      email,
      password,
      confirmPassword,
      dateOfBirth,
      phoneNumber
    );

    if (!isValid) {
      setError("Please ensure all fields are correctly filled.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        localStorage.setItem('token', data.token); // Store the token in local storage
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
    <Layout>
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h2>Create Account</h2>
            <p>Join us and start managing your finances effortlessly!</p>
          </div>
          <form
            className="signup-form"
            method="POST"
            onSubmit={(e) => e.preventDefault()}
          >
            <label>
              Full Name
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Date of Birth
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </label>
            <label>
              Phone Number
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only digits (0-9)
                  if(/^\d*$/.test(value)){
                    setPhoneNumber(value);
                  }
                }}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Confirm Password
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            {error && <p className="error-message">{error}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button
              onClick={handleSignup}
              className="signup-button"
              type="button"
              disabled={!isFormComplete}
            >
              Sign Up
            </button>
          </form>
          <div className="signup-footer">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;