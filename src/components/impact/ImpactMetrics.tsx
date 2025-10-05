

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description?: string;
}

interface FilterData {
  type: 'region' | 'country' | 'all';
  value: string;
}

interface ImpactMetricsProps {
  filter?: FilterData;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  description
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 dark:text-green-400';
      case 'negative':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </p>
          {change && (
            <p className={`text-sm ${getChangeColor()}`}>
              {change}
            </p>
          )}
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {description}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ImpactMetrics({ filter }: ImpactMetricsProps) {
  // Mock data for different regions and countries
  const getAllData = () => ({
    students: 2847,
    projects: 23,
    countries: 18,
    partners: 156,
    change: '+12.5% from last month',
    projectsChange: '+3 new projects this quarter',
    countriesChange: 'Expanding to 3 new countries',
    partnersChange: '+8 new partnerships'
  });

  const getWestAfricaData = () => ({
    students: 1145, // Nigeria + Ghana + Senegal + Mali + Burkina Faso
    projects: 13,
    countries: 5,
    partners: 42,
    change: '+8.2% from last month',
    projectsChange: '+1 new project this quarter',
    countriesChange: 'Expanding in West Africa',
    partnersChange: '+3 new partnerships'
  });

  const getEastAfricaData = () => ({
    students: 825, // Kenya + Tanzania + Ethiopia + Uganda + Rwanda
    projects: 7,
    countries: 5,
    partners: 28,
    change: '+15.8% from last month',
    projectsChange: '+2 new projects this quarter',
    countriesChange: 'Strong growth in East Africa',
    partnersChange: '+4 new partnerships'
  });

  const getNorthAfricaData = () => ({
    students: 397, // Egypt + Morocco + Tunisia + Algeria
    projects: 4,
    countries: 4,
    partners: 22,
    change: '+6.3% from last month',
    projectsChange: 'Focus on policy development',
    countriesChange: 'Policy framework expansion',
    partnersChange: '+2 new partnerships'
  });

  const getSouthernAfricaData = () => ({
    students: 480, // South Africa + Botswana + Namibia + Zambia
    projects: 6,
    countries: 4,
    partners: 18,
    change: '+11.2% from last month',
    projectsChange: '+1 new research project',
    countriesChange: 'Emerging market growth',
    partnersChange: '+1 new partnership'
  });


  const getFilteredData = () => {
    if (!filter || filter.type === 'all') return getAllData();
    
    if (filter.type === 'region') {
      switch (filter.value) {
        case 'West Africa': return getWestAfricaData();
        case 'East Africa': return getEastAfricaData();
        case 'North Africa': return getNorthAfricaData();
        case 'Southern Africa': return getSouthernAfricaData();
        default: return getAllData();
      }
    }
    
    return getAllData();
  };

  const data = getFilteredData();
  
  const getFilterDescription = () => {
    if (!filter || filter.type === 'all') return "AI education programs across Africa";
    if (filter.type === 'region') return `AI education programs in ${filter.value}`;
    return "AI education programs across Africa";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Students Trained"
        value={data.students.toLocaleString()}
        change={data.change}
        changeType="positive"
        description={getFilterDescription()}
        icon={
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        }
      />

      <MetricCard
        title="Research Projects"
        value={data.projects}
        change={data.projectsChange}
        changeType="positive"
        description="Active AI research initiatives"
        icon={
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        }
      />

      <MetricCard
        title="Countries Reached"
        value={data.countries}
        change={data.countriesChange}
        changeType="positive"
        description="African nations with Acentrium presence"
        icon={
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      />

      <MetricCard
        title="Partner Organizations"
        value={data.partners}
        change={data.partnersChange}
        changeType="positive"
        description="Strategic alliances across Africa"
        icon={
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        }
      />
    </div>
  );
}
