import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NotificationProps {
  notification: {
    id: number;
    title: string;
    description: string;
    category: string;
    date: string;
    read: boolean;
  };
  onMarkAsRead: (id: number, readStatus: boolean) => void; 
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short', 
    year: 'numeric', 
    month: 'short',  
    day: 'numeric',  
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true, 
  });
};

const NotificationItem: React.FC<NotificationProps> = ({ notification, onMarkAsRead }) => {
  const { id, title, description, category, date, read } = notification;
  const navigate = useNavigate();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onMarkAsRead(id, !read);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target instanceof HTMLInputElement) {
      return;
    }
    navigate(`/Notification/${id}`);
  };

  return (
    <div
      className={`notification-item ${read ? 'read' : 'unread'}`}
      onClick={handleClick} 
    >
      <div className="notification-header">
        <span className="category-label">{category}</span>
        <h3>{title}</h3>
        <p className="date-time">{formatDate(notification.date)}</p>
</div>
      <p className="description">{description}</p>
      <div className="mark-read-checkbox">
        <input
          type="checkbox"
          checked={read}
          onChange={handleCheckboxChange} 
        />
      </div>
    </div>
  );
};

export default NotificationItem;