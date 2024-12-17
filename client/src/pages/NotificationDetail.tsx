import React from 'react';
import { useParams } from 'react-router-dom';
import './NotificationDetail.css'; // Updated for styling   

const NotificationDetail: React.FC = () => {
  const { id, category } = useParams<{ id: string; category: string }>();

  // Fetch the notification details based on the id and category
  // For simplicity, we'll just display the id and category here
  return (
    <div className="notification-detail">
      <h1>Notification Detail</h1>
      <p className="category">Category: {category}</p>
      <p className="notification-id">Notification ID: {id}</p>
      {/* Add more details and logic to fetch and display the notification details */}
    </div>
  );
};

export default NotificationDetail;