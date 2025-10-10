

interface CountryData {
  name: string;
  students: number;
  projects: number;
  status: 'active' | 'expanding' | 'new';
}

export default function GeographicReach() {
  const countries: CountryData[] = [
    { name: 'Nigeria', students: 847, projects: 8, status: 'active' },
    { name: 'Kenya', students: 523, projects: 5, status: 'active' },
    { name: 'South Africa', students: 412, projects: 4, status: 'active' },
    { name: 'Ghana', students: 298, projects: 3, status: 'active' },
    { name: 'Egypt', students: 267, projects: 2, status: 'expanding' },
    { name: 'Morocco', students: 198, projects: 2, status: 'expanding' },
    { name: 'Tanzania', students: 156, projects: 1, status: 'expanding' },
    { name: 'Ethiopia', students: 134, projects: 1, status: 'new' },
    { name: 'Uganda', students: 112, projects: 1, status: 'new' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'expanding':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const totalStudents = countries.reduce((sum, country) => sum + country.students, 0);
  const totalProjects = countries.reduce((sum, country) => sum + country.projects, 0);

  return (
    <div className="bg-[#e8e8e8] dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Geographic Reach Across Africa
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Impact distribution across {countries.length} African countries
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalStudents.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            Total Students
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {totalProjects}
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            Active Projects
          </div>
        </div>
      </div>

      {/* Countries List */}
      <div className="space-y-3">
        {countries.map((country, index) => (
          <div key={country.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {index + 1}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {country.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {country.students} students • {country.projects} projects
                </div>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(country.status)}`}>
              {country.status}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-100 dark:bg-green-900 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Active Programs</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-100 dark:bg-yellow-900 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Expanding</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">New Programs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
