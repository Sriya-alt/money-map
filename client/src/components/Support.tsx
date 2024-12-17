import React from "react";
import "./Support.css";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const SupportPage: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="support-page">
        {}
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/support">Support</a>
        </nav>

        {}
        <header className="header">
          <h1>Support Page</h1>
          <p>We're here to help! Let us know how we can assist you.</p>
        </header>

        {}
        <section className="section">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about our service.</p>
        </section>

        {}
        <section className="section">
          <h2>Live Chat Support</h2>
          <p>Connect with our team in real-time for instant help.</p>
          <button>Start Chat</button>
        </section>

        {}
        <section className="form-section">
          <h2>Contact Support</h2>
          <form>
            <label>
              Name:
              <input type="text" placeholder="Enter your name" />
            </label>
            <label>
              Email:
              <input type="email" placeholder="Enter your email" />
            </label>
            <label>
              Message:
              <textarea placeholder="How can we help you?" rows={4}></textarea>
            </label>
            <button type="submit">Submit</button>
          </form>
        </section>

        {}
        <section className="return-section">
          <button className="return-button" onClick={handleReturnToDashboard}>
            Return to Dashboard
          </button>
        </section>
      </div>
    </Layout>
  );
};

export default SupportPage;