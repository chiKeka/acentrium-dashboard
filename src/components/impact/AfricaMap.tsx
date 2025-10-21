import { useState } from 'react';

interface CountryData {
  name: string;
  students: number;
  projects: number;
  status: 'active' | 'expanding' | 'new';
  region: string;
}

interface AfricaMapProps {
  onFilterChange?: (filter: { type: 'region' | 'all', value: string }) => void;
}

export default function AfricaMap({ onFilterChange }: AfricaMapProps) {
  const [selectedFilter, setSelectedFilter] = useState<{ type: 'region' | 'all', value: string }>({
    type: 'all',
    value: 'all'
  });
  const countries: CountryData[] = [
    { name: 'Nigeria', students: 847, projects: 8, status: 'active', region: 'West Africa' },
    { name: 'Kenya', students: 523, projects: 5, status: 'active', region: 'East Africa' },
    { name: 'South Africa', students: 412, projects: 4, status: 'active', region: 'Southern Africa' },
    { name: 'Ghana', students: 298, projects: 3, status: 'active', region: 'West Africa' },
    { name: 'Egypt', students: 267, projects: 2, status: 'expanding', region: 'North Africa' },
    { name: 'Morocco', students: 198, projects: 2, status: 'expanding', region: 'North Africa' },
    { name: 'Tanzania', students: 156, projects: 1, status: 'expanding', region: 'East Africa' },
    { name: 'Ethiopia', students: 134, projects: 1, status: 'new', region: 'East Africa' },
    { name: 'Uganda', students: 112, projects: 1, status: 'new', region: 'East Africa' },
    { name: 'Senegal', students: 89, projects: 1, status: 'new', region: 'West Africa' },
    { name: 'Tunisia', students: 76, projects: 1, status: 'new', region: 'North Africa' },
    { name: 'Rwanda', students: 65, projects: 1, status: 'new', region: 'East Africa' },
    { name: 'Algeria', students: 54, projects: 1, status: 'new', region: 'North Africa' },
    { name: 'Botswana', students: 43, projects: 1, status: 'new', region: 'Southern Africa' },
    { name: 'Namibia', students: 32, projects: 1, status: 'new', region: 'Southern Africa' },
    { name: 'Zambia', students: 28, projects: 1, status: 'new', region: 'Southern Africa' },
    { name: 'Mali', students: 21, projects: 1, status: 'new', region: 'West Africa' },
    { name: 'Burkina Faso', students: 18, projects: 1, status: 'new', region: 'West Africa' },
  ];


  const handleFilterChange = (type: 'region' | 'all', value: string) => {
    const newFilter = { type, value };
    setSelectedFilter(newFilter);
    onFilterChange?.(newFilter);
  };

  const getRegionColor = (region: string) => {
    const isSelected = selectedFilter.type === 'region' && selectedFilter.value === region;
    const baseColor = isSelected ? 'ring-2 ring-blue-500' : '';
    
    switch (region) {
      case 'West Africa':
        return `${baseColor} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 cursor-pointer transition-colors`;
      case 'East Africa':
        return `${baseColor} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 cursor-pointer transition-colors`;
      case 'North Africa':
        return `${baseColor} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800 cursor-pointer transition-colors`;
      case 'Southern Africa':
        return `${baseColor} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800 cursor-pointer transition-colors`;
      default:
        return `${baseColor} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors`;
    }
  };

  const totalStudents = countries.reduce((sum, country) => sum + country.students, 0);
  const totalProjects = countries.reduce((sum, country) => sum + country.projects, 0);

  const regionStats = countries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = { students: 0, projects: 0, countries: 0 };
    }
    acc[country.region].students += country.students;
    acc[country.region].projects += country.projects;
    acc[country.region].countries += 1;
    return acc;
  }, {} as Record<string, { students: number; projects: number; countries: number }>);

  return (
    <div className="bg-[#e8e8e8] dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Impact Across Africa
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Geographic distribution of Acentrium Africa's programs and initiatives across {countries.length} countries
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {countries.length}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            Countries Reached
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {totalStudents.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            Total Students
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {totalProjects}
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-400">
            Active Projects
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {countries.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-orange-600 dark:text-orange-400">
            Active Programs
          </div>
        </div>
      </div>

      {/* Interactive Regional Overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Interactive Regional Distribution
          </h4>
          <button
            onClick={() => handleFilterChange('all', 'all')}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              selectedFilter.type === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Show All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(regionStats).map(([region, stats]) => (
            <div 
              key={region} 
              className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
                selectedFilter.type === 'region' && selectedFilter.value === region 
                  ? 'ring-2 ring-blue-500 shadow-md' 
                  : ''
              }`}
              onClick={() => handleFilterChange('region', region)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRegionColor(region)}`}>
                  {region}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {stats.countries} countries
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {stats.students.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stats.projects} projects
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Key Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
          Geographic Impact Insights
        </h5>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>• <strong>West Africa:</strong> Strong presence with {regionStats['West Africa']?.countries || 0} countries and {regionStats['West Africa']?.students.toLocaleString() || 0} students</li>
          <li>• <strong>East Africa:</strong> Growing region with {regionStats['East Africa']?.countries || 0} countries and {regionStats['East Africa']?.students.toLocaleString() || 0} students</li>
          <li>• <strong>North Africa:</strong> Expanding programs with {regionStats['North Africa']?.countries || 0} countries and {regionStats['North Africa']?.students.toLocaleString() || 0} students</li>
          <li>• <strong>Southern Africa:</strong> Emerging presence with {regionStats['Southern Africa']?.countries || 0} countries and {regionStats['Southern Africa']?.students.toLocaleString() || 0} students</li>
        </ul>
      </div>
    </div>
  );
}
