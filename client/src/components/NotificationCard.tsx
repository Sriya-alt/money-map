import React from 'react';
import './NotificationCard.css';

interface NotificationCardProps {
  count: number;
  onClick: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ count, onClick }) => {
  return (
    <div className="notification-card" onClick={onClick}>
      <p className="notification-title">NOTIFICATIONS</p>
      <h1 className="notification-count">{count}</h1>
      <button className="notification-view-more">VIEW MORE</button>
    </div>
  );
};

export default NotificationCard;