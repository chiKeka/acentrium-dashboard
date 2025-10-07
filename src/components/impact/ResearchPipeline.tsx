

import { useData } from '../../context/DataContext';

export default function ResearchPipeline() {
  const { researchProjects } = useData();

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'review':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education':
        return 'bg-blue-500';
      case 'healthcare':
        return 'bg-red-500';
      case 'agriculture':
        return 'bg-green-500';
      case 'finance':
        return 'bg-yellow-500';
      case 'governance':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getProgressPercentage = (stage: string) => {
    switch (stage) {
      case 'planning':
        return 25;
      case 'in-progress':
        return 60;
      case 'review':
        return 85;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };

  const stageCounts = researchProjects.reduce((acc: Record<string, number>, project) => {
    acc[project.stage] = (acc[project.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalFunding = researchProjects.reduce((sum: number, project) => {
    return sum + parseInt(project.funding.replace(/[$,]/g, ''));
  }, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Research & Innovation Pipeline
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track active research projects and their impact across different sectors
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {researchProjects.length}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            Active Projects
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${(totalFunding / 1000).toFixed(0)}K
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            Total Funding
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {researchProjects.reduce((sum: number, p) => sum + p.teamSize, 0)}
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-400">
            Researchers
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stageCounts.completed || 0}
          </div>
          <div className="text-sm text-orange-600 dark:text-orange-400">
            Completed
          </div>
        </div>
      </div>

      {/* Project Stages Overview */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Project Stages Distribution
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { stage: 'planning', label: 'Planning', count: stageCounts.planning || 0 },
            { stage: 'in-progress', label: 'In Progress', count: stageCounts['in-progress'] || 0 },
            { stage: 'review', label: 'Review', count: stageCounts.review || 0 },
            { stage: 'completed', label: 'Completed', count: stageCounts.completed || 0 },
          ].map((item) => (
            <div key={item.stage} className="text-center">
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStageColor(item.stage)}`}>
                {item.label}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900 dark:text-white">
          Research Projects
        </h4>
        {researchProjects.map((project) => (
          <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 ${getCategoryColor(project.category)} rounded-full`}></div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {project.title}
                  </h5>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(project.stage)}`}>
                    {project.stage.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {project.description}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {project.impact}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{getProgressPercentage(project.stage)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage(project.stage)}%` }}
                ></div>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Team:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">
                  {project.teamSize} members
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Funding:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">
                  {project.funding}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Started:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">
                  {formatDate(project.startDate)}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Expected:</span>
                <span className="ml-1 font-medium text-gray-900 dark:text-white">
                  {formatDate(project.expectedCompletion)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
          Research Impact Insights
        </h5>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>• <strong>Diverse sectors:</strong> Research spans agriculture, healthcare, finance, and governance</li>
          <li>• <strong>Significant funding:</strong> ${(totalFunding / 1000).toFixed(0)}K total investment in innovation</li>
          <li>• <strong>Strong completion:</strong> {stageCounts.completed || 0} projects successfully completed</li>
          <li>• <strong>Team collaboration:</strong> {researchProjects.reduce((sum: number, p) => sum + p.teamSize, 0)} researchers actively contributing</li>
        </ul>
      </div>
    </div>
  );
}
