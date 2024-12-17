import React, { useState } from "react";
import "../components/UserAccountPage.css";
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout';

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const UserAccountPage: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "Profile" | "Preferences" | "PrivacyAndSecurity"
  >("Profile");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsNotifications: true,
  });

  const handleReturnToDashboard = () => {
    navigate("/dashboard");
  };

  // Handle user input for profile fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Your information has been updated!");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match!");
    } else {
      alert("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    }
  };

  return (
    <Layout>
    <div className="user-account-page">
      <header className="user-account-header">
        <h1>My Account</h1>
        <p>Manage your profile, preferences, and account settings.</p>
      </header>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "Profile" ? "active" : ""}`}
          onClick={() => setActiveTab("Profile")}
        >
          Profile
        </button>
        <button
          className={`tab-button ${
            activeTab === "Preferences" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Preferences")}
        >
          Preferences
        </button>
        <button
          className={`tab-button ${
            activeTab === "PrivacyAndSecurity" ? "active" : ""
          }`}
          onClick={() => setActiveTab("PrivacyAndSecurity")}
        >
          Privacy and Security
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "Profile" && (
          <div className="profile-section">
            <div className="user-info">
              <div className="info-item">
                <label>Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.name}</p>
                )}
              </div>

              <div className="info-item">
                <label>Email:</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.email}</p>
                )}
              </div>

              <div className="info-item">
                <label>Phone:</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{user.phone}</p>
                )}
              </div>

              <div className="info-item">
                <label>Address:</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                  ></textarea>
                ) : (
                  <p>{user.address}</p>
                )}
              </div>
            </div>

            <div className="button-group">
              {isEditing ? (
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button className="edit-btn" onClick={handleEditToggle}>
                  Edit
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "Preferences" && (
          <div className="preferences-section">
            <h2>Notification Settings</h2>
            <div className="preference-item">
              <label>Email Alerts</label>
              <input
                type="checkbox"
                checked={notificationSettings.emailAlerts}
                onChange={() =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    emailAlerts: !prev.emailAlerts,
                  }))
                }
              />
            </div>
            <div className="preference-item">
              <label>Push Notifications</label>
              <input
                type="checkbox"
                checked={notificationSettings.pushNotifications}
                onChange={() =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    pushNotifications: !prev.pushNotifications,
                  }))
                }
              />
            </div>
            <div className="preference-item">
              <label>SMS Notifications</label>
              <input
                type="checkbox"
                checked={notificationSettings.smsNotifications}
                onChange={() =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    smsNotifications: !prev.smsNotifications,
                  }))
                }
              />
            </div>
          </div>
        )}

        {activeTab === "PrivacyAndSecurity" && (
          <div className="privacy-security-section">
            <div className="security-item">
              <label>Current Password:</label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="security-item">
              <label>New Password:</label>
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="security-item">
              <label>Confirm New Password:</label>
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              className="update-password-btn"
              onClick={handleSavePassword}
            >
              Update Password
            </button>
          </div>
        )}
      </div>

      <button
        className="return-to-dashboard-btn"
        onClick={handleReturnToDashboard}
      >
        Return to Dashboard
      </button>
    </div>
    </Layout>
  );
};

export default UserAccountPage;
