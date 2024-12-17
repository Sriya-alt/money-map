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
    weekday: 'short', // "Mon"
    year: 'numeric', // "2024"
    month: 'short',  // "Nov"
    day: 'numeric',  // "19"
    hour: 'numeric', // "12"
    minute: 'numeric', // "30"
    hour12: true, // 12-hour clock format (AM/PM)
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
    const path = `/notifications/${category.toLowerCase().replace(/\s+/g, '-')}/${id}`;
    navigate(path);
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