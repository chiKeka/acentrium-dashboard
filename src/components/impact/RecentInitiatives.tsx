

import { useData } from '../../context/DataContext';

export default function RecentInitiatives() {
  const { initiatives } = useData();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'research':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'community':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'policy':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Recent Initiatives & Programs
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Latest Acentrium Africa programs and their impact
        </p>
      </div>

      <div className="space-y-4">
        {initiatives.map((initiative) => (
          <div key={initiative.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {initiative.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {initiative.description}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(initiative.category)}`}>
                  {initiative.category}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(initiative.status)}`}>
                  {initiative.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-400">
                  {formatDate(initiative.date)}
                </span>
                {initiative.participants && initiative.participants > 0 && (
                  <span className="text-gray-600 dark:text-gray-400">
                    {initiative.participants.toLocaleString()} participants
                  </span>
                )}
              </div>
              {initiative.impact && (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {initiative.impact}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {initiatives.filter(i => i.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {initiatives.filter(i => i.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {initiatives.filter(i => i.status === 'planned').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Planned</div>
          </div>
        </div>
      </div>
    </div>
  );
}
