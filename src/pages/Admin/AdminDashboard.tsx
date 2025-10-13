import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import DashboardMetricsEditor from './DashboardMetricsEditor';
import ResearchManager from './ResearchManager';
import ProgramManager from './ProgramManager';
import InitiativeManager from './InitiativeManager';
import CalendarManager from './CalendarManager';
import AdminSettings from './AdminSettings';
import { AdminSection } from '../../types/dashboard';

const AdminDashboard: React.FC = () => {
  const { user, canCreateEvents } = useUser(); // canCreateEvents is true if user is admin
  const [, setActiveSection] = useState<AdminSection>('dashboard');

  // Redirect to home if not authenticated
  if (!user || !canCreateEvents) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Admin Sidebar */}
        <AdminSidebar 
          onSectionChange={setActiveSection}
          user={user} // user is the current user
        />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className="p-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage all content for the Acentrium Africa Dashboard
              </p>
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <Routes>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardMetricsEditor />} />
                <Route path="research" element={<ResearchManager />} />
                <Route path="programs" element={<ProgramManager />} />
                <Route path="initiatives" element={<InitiativeManager />} />
                <Route path="calendar" element={<CalendarManager />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
