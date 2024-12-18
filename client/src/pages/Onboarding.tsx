import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./Onboarding.css";

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToSupport = () => {
    navigate("/support");
  };

  return (
    <Layout>
      <div className="onboarding-page">
        <header className="navbar">
          <div className="logo">MoneyMap</div>
          <nav>
            <button
              className="login-signup-button"
              onClick={() => navigate("./login")}
            >
              Log In
            </button>
          </nav>
        </header>

        <main className="hero-section">
          <h1 className="hero-title">SAVE, BUDGET, GROW.</h1>
          <p className="hero-subtitle">Take control of your finances today.</p>
          <button
            className="get-started-button"
            onClick={() => navigate("./signup")}
          >
            GET STARTED
          </button>
        </main>

        <section className="info-section">
          <p className="info-intro">
            Join us to master your money, one goal at a time, and take control
            of your financial future!
          </p>
          <p className="info-description">
            Our services allow you to monitor spending habits, set and manage
            personalized budgets, track progress toward your savings goals, and
            gain insights into your financial health. With tools designed to
            simplify money management, we help you make informed financial
            decisions every step of the way.
          </p>
          <div className="features-container">
            <div className="feature-card">
              <h2>TRACK YOUR SPENDING.</h2>
              <p>
                Gain full visibility of where your money goes. Our spending
                tracker categorizes your expenses automatically, helping you
                make mindful choices with every purchase.
              </p>
            </div>
            <div className="feature-card">
              <h2>MAKE PERSONALISED BUDGETS.</h2>
              <p>
                Take control of your finances with customized budgets that
                adapt to your lifestyle. Set spending limits and track your
                progress to help you stay on track.
              </p>
            </div>
            <div className="feature-card">
              <h2>MEET SAVING GOALS.</h2>
              <p>
                Achieve your financial dreams, one goal at a time. Track your
                progress, celebrate milestones, and get closer to reaching your
                goals every day.
              </p>
            </div>
          </div>
        </section>

        {}
        <button className="help-button" onClick={handleNavigateToSupport}>
          Help
        </button>
      </div>
    </Layout>
  );
};

export default Onboarding;