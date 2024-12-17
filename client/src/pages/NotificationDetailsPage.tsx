import React from 'react';
import { useParams } from 'react-router-dom';


const allNotifications = [
  { id: 1, title: 'You’ve exceeded your food budget', description: 'You’ve spent $50 on dining out this week, which is 20% over your budget.', category: 'Spending Alerts', date: '12:30 19-11-2024', read: false },
  { id: 2, title: 'Entertainment Budget Exceeded', description: 'You’ve reached 80% of your entertainment budget for the month.', category: 'Budget Reminders', date: '10:15 19-11-2024 ', read: false },
  { id: 3, title: 'Savings Goal Achieved', description: 'You’ve saved $500 towards your goal of $1000.', category: 'Savings Goals', date: '18:00 18-11-2024 ', read: true },
  { id: 4, title: 'Internet Subscription Due', description: 'Your internet bill is due in 3 days.', category: 'Bill Reminders', date: '09:00 17-11-2024', read: false },
  { id: 5, title: 'October Report Available', description: 'Your October report is available.', category: 'Monthly Reports', date: '12:00 01-11-24', read: false },
];

const NotificationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const notificationId = parseInt(id!); 
  const notification = allNotifications.find((n) => n.id === notificationId); 

  if (!notification) {
    return <div>Notification not found</div>; 
  }

  return (
    <div className="notification-detail-page">
      <p>Not sure what would be on this page yet</p>
      <h1>{notification.title}</h1>
      <h3>Category: {notification.category}</h3>
      <p>{notification.description}</p>
      <p>Date: {notification.date}</p>
      <div>Status: {notification.read ? 'Read' : 'Unread'}</div>
    </div>
  );
};

export default NotificationDetailPage;