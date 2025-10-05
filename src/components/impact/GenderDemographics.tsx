
import Chart from 'react-apexcharts';

export default function GenderDemographics() {
  const genderData = {
    series: [68, 32], // 68% women, 32% men
    options: {
      chart: {
        type: 'donut' as const,
        height: 300,
      },
      labels: ['Women', 'Men'],
      colors: ['#3B82F6', '#10B981'],
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return Math.round(val) + '%';
        },
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          colors: '#6B7280',
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Participants',
                fontSize: '16px',
                fontWeight: 600,
                color: '#374151',
                formatter: function () {
                  return '2,847';
                },
              },
            },
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val: number, opts: any) {
            const total = opts.w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
            const count = Math.round((val / 100) * total);
            return count + ' participants (' + val + '%)';
          },
        },
      },
    },
  };

  const ageData = {
    series: [
      {
        name: 'Participants',
        data: [45, 320, 580, 890, 720, 291], // Age groups: 18-22, 23-27, 28-32, 33-37, 38-42, 43+
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 300,
        toolbar: {
          show: false,
        },
      },
      colors: ['#3B82F6'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['18-22', '23-27', '28-32', '33-37', '38-42', '43+'],
        labels: {
          style: {
            colors: '#6B7280',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6B7280',
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
            return val + ' participants';
          },
        },
      },
    },
  };

  const educationData = [
    { level: 'High School', count: 420, percentage: 14.8 },
    { level: 'Bachelor\'s', count: 1280, percentage: 45.0 },
    { level: 'Master\'s', count: 890, percentage: 31.3 },
    { level: 'PhD', count: 257, percentage: 9.0 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Gender & Demographics
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Participation breakdown by gender, age, and education level
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            Gender Distribution
          </h4>
          <div className="h-[300px]">
            <Chart
              options={genderData.options}
              series={genderData.series}
              type="donut"
              height="100%"
              width="100%"
            />
          </div>
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>68% Women Participation</strong> - Exceeding our target of 60% women in AI programs
            </p>
          </div>
        </div>

        {/* Age Distribution */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            Age Distribution
          </h4>
          <div className="h-[300px]">
            <Chart
              options={ageData.options}
              series={ageData.series}
              type="bar"
              height="100%"
              width="100%"
            />
          </div>
          <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Youth Focus</strong> - 78% of participants are under 32 years old
            </p>
          </div>
        </div>
      </div>

      {/* Education Level Breakdown */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Education Level Distribution
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {educationData.map((item, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.level}
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {item.percentage}%
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {item.count.toLocaleString()}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
          Key Demographics Insights
        </h5>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>• <strong>Gender balance:</strong> 68% women participation exceeds industry average of 35%</li>
          <li>• <strong>Youth engagement:</strong> 78% of participants are under 32, supporting our youth focus</li>
          <li>• <strong>Education diversity:</strong> 45% Bachelor's degree holders, 31% Master's level</li>
          <li>• <strong>Inclusive access:</strong> 14.8% High School graduates showing accessibility</li>
        </ul>
      </div>
    </div>
  );
}
