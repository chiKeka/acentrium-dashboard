
import Chart from 'react-apexcharts';
import { useData } from '../../context/DataContext';
import { ApexOptions } from 'apexcharts';

export default function ProgramCompletion() {
  const { programs, completionData } = useData();

  const totalEnrolled = programs.reduce((sum, program) => sum + program.enrolled, 0);
  const totalCompleted = programs.reduce((sum, program) => sum + program.completed, 0);
  const overallCompletionRate = Math.round((totalCompleted / totalEnrolled) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Program Completion Analysis
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track completion rates and program effectiveness across all AI education initiatives
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {overallCompletionRate}%
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            Overall Completion Rate
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalEnrolled.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            Total Enrolled
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {totalCompleted.toLocaleString()}
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-400">
            Successfully Completed
          </div>
        </div>
      </div>

      {/* Monthly Completion Trend */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Monthly Completion Rate Trend
        </h4>
        <div className="h-[300px]">
          <Chart
            options={completionData.options as ApexOptions}
            series={completionData.series}
            type="line"
            height="100%"
            width="100%"
          />
        </div>
      </div>

      {/* Program Breakdown */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Program Performance Breakdown
        </h4>
        <div className="space-y-4">
          {programs.map((program, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${program.color} rounded-full`}></div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {program.name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {program.avgDuration}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {program.completionRate}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {program.completed}/{program.enrolled}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`${program.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${program.completionRate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
          Program Effectiveness Insights
        </h5>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>• <strong>High completion rates:</strong> Average 85% completion rate across all programs</li>
          <li>• <strong>Best performing:</strong> AI Ethics and Machine Learning at 90% completion</li>
          <li>• <strong>Consistent quality:</strong> Monthly completion rates stable between 76-94%</li>
          <li>• <strong>Engagement success:</strong> {totalCompleted.toLocaleString()} students successfully completed programs</li>
        </ul>
      </div>
    </div>
  );
}
