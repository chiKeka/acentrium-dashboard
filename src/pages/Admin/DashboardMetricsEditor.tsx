import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DashboardMetrics, RegionalData } from '../../types/dashboard';

const DashboardMetricsEditor: React.FC = () => {
  const { dashboardMetrics, regionalData, updateDashboardMetrics, updateRegionalData } = useData();
  const [editingMetrics, setEditingMetrics] = useState(false);
  const [editingRegion, setEditingRegion] = useState<string | null>(null);
  const [formData, setFormData] = useState<DashboardMetrics>(dashboardMetrics);
  const [regionFormData, setRegionFormData] = useState<RegionalData | null>(null);

  const handleSaveMetrics = () => {
    updateDashboardMetrics(formData);
    setEditingMetrics(false);
  };

  const handleCancelMetrics = () => {
    setFormData(dashboardMetrics);
    setEditingMetrics(false);
  };

  const handleEditRegion = (region: RegionalData) => {
    setRegionFormData({ ...region });
    setEditingRegion(region.region);
  };

  const handleSaveRegion = () => {
    if (regionFormData) {
      updateRegionalData(regionFormData.region, regionFormData);
      setEditingRegion(null);
      setRegionFormData(null);
    }
  };

  const handleCancelRegion = () => {
    setEditingRegion(null);
    setRegionFormData(null);
  };

  const handleInputChange = (field: keyof DashboardMetrics, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegionInputChange = (field: keyof RegionalData, value: string | number) => {
    if (regionFormData) {
      setRegionFormData(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Metrics Management
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Update the main dashboard metrics and regional breakdown data
        </p>
      </div>

      {/* Main Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
            Overall Impact Metrics
          </h3>
          {!editingMetrics && (
            <button
              onClick={() => setEditingMetrics(true)}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Edit Metrics
            </button>
          )}
        </div>

        {editingMetrics ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Total Students
                </label>
                <input
                  type="number"
                  value={formData.students}
                  onChange={(e) => handleInputChange('students', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Total Students"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Total Projects
                </label>
                <input
                  type="number"
                  value={formData.projects}
                  onChange={(e) => handleInputChange('projects', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Total Projects"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Countries Reached
                </label>
                <input
                  type="number"
                  value={formData.countries}
                  onChange={(e) => handleInputChange('countries', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Countries Reached"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Partners
                </label>
                <input
                  type="number"
                  value={formData.partners}
                  onChange={(e) => handleInputChange('partners', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Partners"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Students Change
                </label>
                <input
                  type="text"
                  value={formData.change}
                  onChange={(e) => handleInputChange('change', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., +12.5% from last month"
                  aria-label="Students Change Description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Projects Change
                </label>
                <input
                  type="text"
                  value={formData.projectsChange}
                  onChange={(e) => handleInputChange('projectsChange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., +3 new projects this quarter"
                  aria-label="Projects Change Description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Countries Change
                </label>
                <input
                  type="text"
                  value={formData.countriesChange}
                  onChange={(e) => handleInputChange('countriesChange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Expanding to 3 new countries"
                  aria-label="Countries Change Description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Partners Change
                </label>
                <input
                  type="text"
                  value={formData.partnersChange}
                  onChange={(e) => handleInputChange('partnersChange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., +8 new partnerships"
                  aria-label="Partners Change Description"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSaveMetrics}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelMetrics}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {dashboardMetrics.students.toLocaleString()}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Students</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {dashboardMetrics.change}
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {dashboardMetrics.projects}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">Projects</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {dashboardMetrics.projectsChange}
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {dashboardMetrics.countries}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Countries</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {dashboardMetrics.countriesChange}
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {dashboardMetrics.partners}
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">Partners</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {dashboardMetrics.partnersChange}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Regional Data */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Regional Breakdown
        </h3>
        
        <div className="space-y-4">
          {regionalData.map((region) => (
            <div key={region.region} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {region.region}
                </h4>
                {editingRegion !== region.region && (
                  <button
                    onClick={() => handleEditRegion(region)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {editingRegion === region.region && regionFormData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Students
                      </label>
                      <input
                        type="number"
                        value={regionFormData.students}
                        onChange={(e) => handleRegionInputChange('students', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        aria-label={`${regionFormData.region} Students`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Projects
                      </label>
                      <input
                        type="number"
                        value={regionFormData.projects}
                        onChange={(e) => handleRegionInputChange('projects', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        aria-label={`${regionFormData.region} Projects`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Countries
                      </label>
                      <input
                        type="number"
                        value={regionFormData.countries}
                        onChange={(e) => handleRegionInputChange('countries', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        aria-label={`${regionFormData.region} Countries`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Partners
                      </label>
                      <input
                        type="number"
                        value={regionFormData.partners}
                        onChange={(e) => handleRegionInputChange('partners', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        aria-label={`${regionFormData.region} Partners`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Change Description
                      </label>
                      <input
                        type="text"
                        value={regionFormData.change}
                        onChange={(e) => handleRegionInputChange('change', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        aria-label={`${regionFormData.region} Change Description`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Projects Change
                      </label>
                      <input
                        type="text"
                        value={regionFormData.projectsChange}
                        onChange={(e) => handleRegionInputChange('projectsChange', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        aria-label={`${regionFormData.region} Projects Change`}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveRegion}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelRegion}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {region.students.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      {region.projects}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {region.countries}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                      {region.partners}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Partners</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardMetricsEditor;
