
import Chart from 'react-apexcharts';

export default function ProgramImpactChart() {
  const chartData = {
    series: [
      {
        name: 'Students Trained',
        data: [120, 180, 250, 320, 280, 450, 520, 480, 650, 720, 680, 847]
      },
      {
        name: 'Research Projects',
        data: [2, 3, 5, 8, 12, 15, 18, 16, 20, 22, 21, 23]
      },
      {
        name: 'New Partnerships',
        data: [8, 12, 15, 18, 22, 28, 35, 32, 40, 45, 42, 48]
      }
    ],
    options: {
      chart: {
        type: 'area' as const,
        height: 350,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth' as const,
        width: 2,
      },
      colors: ['#3B82F6', '#10B981', '#F59E0B'],
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
        labels: {
          style: {
            colors: '#6B7280',
          },
          formatter: function (val: number) {
            return Math.floor(val).toString();
          }
        },
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 4,
      },
      legend: {
        position: 'top' as const,
        horizontalAlign: 'left' as const,
        labels: {
          colors: '#6B7280',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100]
        }
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: function (val: number) {
            return Math.floor(val).toString();
          }
        }
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Program Impact Over Time
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Monthly progress across key Acentrium Africa initiatives
        </p>
      </div>
      
      <div className="h-[350px]">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
