
import Chart from 'react-apexcharts';

export default function ProgramCompletion() {
  const completionData = {
    series: [
      {
        name: 'Completion Rate',
        data: [85, 78, 92, 88, 76, 89, 94, 82, 87, 91, 86, 90], // Monthly completion rates
      },
    ],
    options: {
      chart: {
        type: 'line' as const,
        height: 300,
        toolbar: {
          show: true,
        },
      },
      colors: ['#10B981'],
      stroke: {
        curve: 'smooth' as const,
        width: 3,
      },
      markers: {
        size: 6,
        colors: ['#10B981'],
        strokeColors: '#ffffff',
        strokeWidth: 2,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            colors: '#6B7280',
          },
        },
      },
      yaxis: {
        min: 70,
        max: 100,
        labels: {
          style: {
            colors: '#6B7280',
          },
          formatter: function (val: number) {
            return val + '%';
          },
        },
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 4,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + '% completion rate';
          },
        },
      },
    },
  };

  const programTypes = [
    {
      name: 'AI Fundamentals',
      enrolled: 450,
      completed: 382,
      completionRate: 85,
      avgDuration: '6 weeks',
      color: 'bg-blue-500',
    },
    {
      name: 'Machine Learning',
      enrolled: 320,
      completed: 288,
      completionRate: 90,
      avgDuration: '8 weeks',
      color: 'bg-green-500',
    },
    {
      name: 'Data Science',
      enrolled: 280,
      completed: 224,
      completionRate: 80,
      avgDuration: '10 weeks',
      color: 'bg-purple-500',
    },
    {
      name: 'AI Ethics',
      enrolled: 180,
      completed: 162,
      completionRate: 90,
      avgDuration: '4 weeks',
      color: 'bg-orange-500',
    },
    {
      name: 'Deep Learning',
      enrolled: 150,
      completed: 120,
      completionRate: 80,
      avgDuration: '12 weeks',
      color: 'bg-red-500',
    },
    {
      name: 'AI for Business',
      enrolled: 200,
      completed: 170,
      completionRate: 85,
      avgDuration: '6 weeks',
      color: 'bg-teal-500',
    },
  ];

  const totalEnrolled = programTypes.reduce((sum, program) => sum + program.enrolled, 0);
  const totalCompleted = programTypes.reduce((sum, program) => sum + program.completed, 0);
  const overallCompletionRate = Math.round((totalCompleted / totalEnrolled) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
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
            options={completionData.options}
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
          {programTypes.map((program, index) => (
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
