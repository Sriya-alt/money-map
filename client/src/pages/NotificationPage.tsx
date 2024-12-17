import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationItem from '../components/NotificationItem';
import NotificationSidebar from '../components/NotificationSidebar';
import '../components/notification.css';

interface Notification {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  read: boolean;
}


const allNotifications = [
  { id: 1, title: 'You’ve exceeded your food budget', description: 'You’ve spent $50 on dining out this week, which is 20% over your budget.', category: 'Spending Alerts', date: '2024-11-19T12:30:00', read: false },
  { id: 2, title: 'Entertainment Budget Exceeded', description: 'You’ve reached 80% of your entertainment budget for the month.', category: 'Budget Reminders', date: '2024-11-19T10:15:00', read: false },
  { id: 3, title: 'Savings Goal Achieved', description: 'You’ve saved $500 towards your goal of $1000.', category: 'Savings Goals', date: '2024-11-18T18:00:00', read: true },
  { id: 4, title: 'Internet Subscription Due', description: 'Your internet bill is due in 3 days.', category: 'Bill Reminders', date: '2024-11-17T09:00:00', read: false },
  { id: 5, title: 'October Report Available', description: 'Your October report is available.', category: 'Monthly Reports', date: '2024-11-01T12:00:00', read: false },
];

const NotificationPage: React.FC = () => {
  const navigate = useNavigate(); 
  const [selectedCategory, setSelectedCategory] = useState<string>('All Notifications');
  const [notifications, setNotifications] = useState<Notification[]>(allNotifications);
  const [readFilter, setReadFilter] = useState<string>('All');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const handleMarkAsRead = (id: number, readStatus: boolean) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: readStatus } : notification
    ));
  };

  const filterNotifications = (category: string, filter: string) => {
    let filteredNotifications = notifications;

    if (category !== 'All Notifications') {
      filteredNotifications = filteredNotifications.filter(notification => notification.category === category);
    }

    if (filter === 'Read') {
      filteredNotifications = filteredNotifications.filter(notification => notification.read);
    } else if (filter === 'Unread') {
      filteredNotifications = filteredNotifications.filter(notification => !notification.read);
    }

    return filteredNotifications;
  };

  const filteredNotifications = filterNotifications(selectedCategory, readFilter);

  const getUnreadCountForCategory = (category: string) => {
    if (category === 'All Notifications') {
      return notifications.filter(notification => !notification.read).length;
    }
    return notifications.filter(
      notification => notification.category === category && !notification.read
    ).length;
  };

  return (
    <div className={`notification-page ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <NotificationSidebar 
        setSelectedCategory={setSelectedCategory} 
        selectedCategory={selectedCategory} 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        getUnreadCountForCategory={getUnreadCountForCategory} 
      />

      <div className="filter-dropdown">
        <label htmlFor="read-filter">Filter: </label>
        <select
          id="read-filter"
          value={readFilter}
          onChange={(e) => setReadFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Read">Read</option>
          <option value="Unread">Unread</option>
        </select>
      </div>

      <div className="notification-feed">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications-message">You’re all caught up!</div>
        ) : (
          filteredNotifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        )}
      </div>

      {}
      <div className="return-dashboard">
        <button className="return-dashboard-btn" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotificationPage;