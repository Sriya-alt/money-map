import React from 'react';

interface SidebarProps {
  setSelectedCategory: (category: string) => void;
  selectedCategory: string;
  isCollapsed: boolean;
  toggleSidebar: () => void; 
  getUnreadCountForCategory: (category: string) => number;
}


const categories = [
    'All Notifications',
    'Spending Alerts',
    'Budget Reminders',
    'Savings Goals',
    'Bill Reminders',
    'Monthly Reports',
    'Security Alerts',
    'Other',
  ];

  const NotificationSidebar: React.FC<SidebarProps> = ({
    setSelectedCategory,
    selectedCategory,
    isCollapsed,
    toggleSidebar,
    getUnreadCountForCategory,
  }) => {
  return (
    <div className={`notification-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button onClick={toggleSidebar} className="toggle-sidebar-btn">
        {isCollapsed ? '>' : '<'}
      </button>
      {!isCollapsed && (
        <>
          <h2 className="sidebar-title">Notifications</h2>
          <ul>
            {categories.map(category => (
              <li
              key={category}
            className={`sidebar-item ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            <span>{category}</span>
              <span className="badge">
                {getUnreadCountForCategory(category)}
              </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NotificationSidebar;
