import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminSection } from '../../types/dashboard';

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  user: any;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  onSectionChange, 
  user 
}) => {
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard' as AdminSection,
      label: 'Dashboard Metrics',
      icon: '📊',
      path: '/admin/dashboard',
      description: 'Manage impact metrics and regional data'
    },
    {
      id: 'research' as AdminSection,
      label: 'Research Projects',
      icon: '🔬',
      path: '/admin/research',
      description: 'Add, edit, and manage research projects'
    },
    {
      id: 'programs' as AdminSection,
      label: 'Programs',
      icon: '🎓',
      path: '/admin/programs',
      description: 'Manage education programs and completion data'
    },
    {
      id: 'initiatives' as AdminSection,
      label: 'Initiatives',
      icon: '🚀',
      path: '/admin/initiatives',
      description: 'Create and track initiatives and programs'
    },
    {
      id: 'calendar' as AdminSection,
      label: 'Calendar Events',
      icon: '📅',
      path: '/admin/calendar',
      description: 'Manage events and calendar entries'
    },
    {
      id: 'settings' as AdminSection,
      label: 'Settings',
      icon: '⚙️',
      path: '/admin/settings',
      description: 'Data management and system settings'
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Admin Panel
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Acentrium Africa
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name || 'Admin User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email || 'admin@acentrium.org'}
            </p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-3 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <span>👁️</span>
            <span>View Dashboard</span>
          </Link>
          <button
            onClick={() => {
              // Add logout functionality
              window.location.href = '/';
            }}
            className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            <span>🚪</span>
            <span>Exit Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { AdminSidebar };
