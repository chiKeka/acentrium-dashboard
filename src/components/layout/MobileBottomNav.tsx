import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {
  CalenderIcon,
  GridIcon,
  PieChartIcon,
  ListIcon,
  UserCircleIcon,
} from '../../icons';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { hasAttemptedLogin, canCreateEvents } = useUser();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/",
    },
    {
      icon: <CalenderIcon />,
      name: "Calendar",
      path: "/calendar",
    },
    {
      icon: <PieChartIcon />,
      name: "Research",
      path: "/research",
    },
    {
      icon: <ListIcon />,
      name: "Programs",
      path: "/programs",
    },
    {
      icon: <UserCircleIcon />,
      name: "Initiatives",
      path: "/initiatives",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 lg:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center space-y-1 ${
              isActive(item.path)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <div className={`w-6 h-6 ${
              isActive(item.path)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {item.icon}
            </div>
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
      
      {/* Admin Login Button for Mobile - Only show if user has actually attempted login but is not authenticated */}
      {hasAttemptedLogin === true && canCreateEvents === false && (
        <div className="absolute -top-12 right-4">
          <Link
            to="/admin"
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            title="Admin Login"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileBottomNav;
