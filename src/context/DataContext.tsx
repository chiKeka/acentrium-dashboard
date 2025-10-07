import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  DashboardMetrics,
  RegionalData,
  ResearchProject,
  Program,
  Initiative,
  CalendarEvent,
  CountryData,
  CompletionData
} from '../types/dashboard';

interface DataContextType {
  // Dashboard Data
  dashboardMetrics: DashboardMetrics;
  regionalData: RegionalData[];
  countryData: CountryData[];
  completionData: CompletionData;
  
  // Content Data
  researchProjects: ResearchProject[];
  programs: Program[];
  initiatives: Initiative[];
  calendarEvents: CalendarEvent[];
  
  // Actions
  updateDashboardMetrics: (metrics: Partial<DashboardMetrics>) => void;
  updateRegionalData: (region: string, data: Partial<RegionalData>) => void;
  updateCountryData: (country: string, data: Partial<CountryData>) => void;
  
  // Research Actions
  addResearchProject: (project: Omit<ResearchProject, 'id'>) => void;
  updateResearchProject: (id: number, project: Partial<ResearchProject>) => void;
  deleteResearchProject: (id: number) => void;
  
  // Program Actions
  addProgram: (program: Program) => void;
  updateProgram: (name: string, program: Partial<Program>) => void;
  deleteProgram: (name: string) => void;
  
  // Initiative Actions
  addInitiative: (initiative: Omit<Initiative, 'id'>) => void;
  updateInitiative: (id: number, initiative: Partial<Initiative>) => void;
  deleteInitiative: (id: number) => void;
  
  // Calendar Actions
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateCalendarEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteCalendarEvent: (id: string) => void;
  
  // Utility
  exportData: () => string;
  importData: (data: string) => boolean;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Default data matching current implementation
const defaultDashboardMetrics: DashboardMetrics = {
  students: 2847,
  projects: 23,
  countries: 18,
  partners: 156,
  change: '+12.5% from last month',
  projectsChange: '+3 new projects this quarter',
  countriesChange: 'Expanding to 3 new countries',
  partnersChange: '+8 new partnerships'
};

const defaultRegionalData: RegionalData[] = [
  {
    region: 'West Africa',
    students: 1145,
    projects: 13,
    countries: 5,
    partners: 42,
    change: '+8.2% from last month',
    projectsChange: '+1 new project this quarter',
    countriesChange: 'Expanding in West Africa',
    partnersChange: '+3 new partnerships'
  },
  {
    region: 'East Africa',
    students: 825,
    projects: 7,
    countries: 5,
    partners: 28,
    change: '+15.8% from last month',
    projectsChange: '+2 new projects this quarter',
    countriesChange: 'Strong growth in East Africa',
    partnersChange: '+4 new partnerships'
  },
  {
    region: 'North Africa',
    students: 397,
    projects: 4,
    countries: 4,
    partners: 22,
    change: '+6.3% from last month',
    projectsChange: 'Focus on policy development',
    countriesChange: 'Policy framework expansion',
    partnersChange: '+2 new partnerships'
  },
  {
    region: 'Southern Africa',
    students: 480,
    projects: 6,
    countries: 4,
    partners: 18,
    change: '+11.2% from last month',
    projectsChange: '+1 new research project',
    countriesChange: 'Emerging market growth',
    partnersChange: '+1 new partnership'
  }
];

const defaultCountryData: CountryData[] = [
  { name: 'Nigeria', students: 847, projects: 8, status: 'active', region: 'West Africa' },
  { name: 'Ghana', students: 234, projects: 3, status: 'active', region: 'West Africa' },
  { name: 'Senegal', students: 145, projects: 2, status: 'expanding', region: 'West Africa' },
  { name: 'Mali', students: 98, projects: 1, status: 'new', region: 'West Africa' },
  { name: 'Burkina Faso', students: 76, projects: 1, status: 'new', region: 'West Africa' },
  { name: 'Kenya', students: 456, projects: 4, status: 'active', region: 'East Africa' },
  { name: 'Tanzania', students: 189, projects: 2, status: 'active', region: 'East Africa' },
  { name: 'Ethiopia', students: 134, projects: 1, status: 'expanding', region: 'East Africa' },
  { name: 'Uganda', students: 87, projects: 1, status: 'new', region: 'East Africa' },
  { name: 'Rwanda', students: 89, projects: 1, status: 'new', region: 'East Africa' },
  { name: 'Egypt', students: 234, projects: 2, status: 'active', region: 'North Africa' },
  { name: 'Morocco', students: 98, projects: 1, status: 'active', region: 'North Africa' },
  { name: 'Tunisia', students: 45, projects: 1, status: 'new', region: 'North Africa' },
  { name: 'Algeria', students: 20, projects: 1, status: 'new', region: 'North Africa' },
  { name: 'South Africa', students: 298, projects: 3, status: 'active', region: 'Southern Africa' },
  { name: 'Botswana', students: 89, projects: 1, status: 'active', region: 'Southern Africa' },
  { name: 'Namibia', students: 67, projects: 1, status: 'expanding', region: 'Southern Africa' },
  { name: 'Zambia', students: 26, projects: 1, status: 'new', region: 'Southern Africa' }
];

const defaultResearchProjects: ResearchProject[] = [
  {
    id: 1,
    title: 'AI-Powered Healthcare Diagnostics',
    description: 'Machine learning models for early disease detection in resource-limited settings',
    stage: 'in-progress',
    startDate: '2024-06-01',
    expectedCompletion: '2025-08-31',
    teamSize: 8,
    funding: '$180,000',
    impact: 'Diagnostic accuracy improved by 35%',
    category: 'healthcare'
  },
  {
    id: 2,
    title: 'Smart Agriculture Solutions',
    description: 'IoT and AI integration for crop monitoring and yield optimization',
    stage: 'review',
    startDate: '2024-03-15',
    expectedCompletion: '2025-05-30',
    teamSize: 6,
    funding: '$150,000',
    impact: 'Crop yield increased by 25% in pilot farms',
    category: 'agriculture'
  },
  {
    id: 3,
    title: 'Financial Inclusion AI Platform',
    description: 'Credit scoring and microfinance solutions for underserved communities',
    stage: 'planning',
    startDate: '2025-03-01',
    expectedCompletion: '2026-02-28',
    teamSize: 10,
    funding: '$250,000',
    impact: 'Target: 50,000 new borrowers',
    category: 'finance'
  },
  {
    id: 4,
    title: 'E-Government AI Assistant',
    description: 'Natural language processing for citizen services and government efficiency',
    stage: 'in-progress',
    startDate: '2024-09-01',
    expectedCompletion: '2025-12-31',
    teamSize: 7,
    funding: '$200,000',
    impact: 'Service response time reduced by 60%',
    category: 'governance'
  },
  {
    id: 5,
    title: 'AI Education Platform for Rural Schools',
    description: 'Adaptive learning system for STEM education in remote areas',
    stage: 'completed',
    startDate: '2024-01-01',
    expectedCompletion: '2024-12-31',
    teamSize: 6,
    funding: '$120,000',
    impact: 'Deployed in 200 schools, 15,000 students',
    category: 'education'
  },
  {
    id: 6,
    title: 'Climate Change Prediction Models',
    description: 'AI models for weather forecasting and climate impact assessment',
    stage: 'in-progress',
    startDate: '2025-02-01',
    expectedCompletion: '2025-11-30',
    teamSize: 9,
    funding: '$220,000',
    impact: 'Weather alerts for 5 million people',
    category: 'agriculture'
  }
];

const defaultPrograms: Program[] = [
  { name: 'AI Fundamentals', enrolled: 450, completed: 382, completionRate: 85, avgDuration: '6 weeks', color: 'bg-blue-500' },
  { name: 'Machine Learning', enrolled: 320, completed: 288, completionRate: 90, avgDuration: '8 weeks', color: 'bg-green-500' },
  { name: 'Data Science', enrolled: 280, completed: 224, completionRate: 80, avgDuration: '10 weeks', color: 'bg-purple-500' },
  { name: 'AI Ethics', enrolled: 180, completed: 162, completionRate: 90, avgDuration: '4 weeks', color: 'bg-orange-500' },
  { name: 'Deep Learning', enrolled: 150, completed: 120, completionRate: 80, avgDuration: '12 weeks', color: 'bg-red-500' },
  { name: 'AI for Business', enrolled: 200, completed: 170, completionRate: 85, avgDuration: '6 weeks', color: 'bg-teal-500' }
];

const defaultInitiatives: Initiative[] = [
  {
    id: 1,
    title: "AI for African Women Initiative",
    description: "Empowering African women with AI skills and entrepreneurship opportunities",
    category: 'education',
    status: 'active',
    date: '2025-09-15',
    participants: 450,
    impact: '12 startups launched'
  },
  {
    id: 2,
    title: "Youth AI Hackathon 2025",
    description: "Pan-African hackathon connecting young innovators across 15 countries",
    category: 'community',
    status: 'completed',
    date: '2025-08-20',
    participants: 1200,
    impact: '45 innovative solutions'
  },
  {
    id: 3,
    title: "AI Policy Framework Research",
    description: "Developing comprehensive AI governance frameworks for African nations",
    category: 'research',
    status: 'active',
    date: '2025-09-01',
    participants: 25,
    impact: '3 policy papers published'
  },
  {
    id: 4,
    title: "Rural AI Education Program",
    description: "Bringing AI education to underserved rural communities",
    category: 'education',
    status: 'active',
    date: '2025-09-10',
    participants: 300,
    impact: '8 rural centers established'
  },
  {
    id: 5,
    title: "AI Ethics Workshop Series",
    description: "Training program on responsible AI development and deployment",
    category: 'education',
    status: 'planned',
    date: '2025-10-15',
    participants: 0,
    impact: 'Expected: 200 professionals'
  }
];

const defaultCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'AI Fundamentals Workshop',
    start: '2025-01-15',
    end: '2025-01-15',
    allDay: true,
    extendedProps: { calendar: 'education' }
  },
  {
    id: '2',
    title: 'Research Review Meeting',
    start: '2025-01-20',
    end: '2025-01-20',
    allDay: true,
    extendedProps: { calendar: 'research' }
  },
  {
    id: '3',
    title: 'Community Outreach Event',
    start: '2025-01-25',
    end: '2025-01-25',
    allDay: true,
    extendedProps: { calendar: 'community' }
  }
];

const defaultCompletionData: CompletionData = {
  series: [
    {
      name: 'Completion Rate',
      data: [85, 78, 92, 88, 76, 89, 94, 82, 87, 91, 86, 90]
    }
  ],
  options: {
    chart: {
      type: 'line',
      height: 300,
      toolbar: { show: true }
    },
    colors: ['#10B981'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics>(defaultDashboardMetrics);
  const [regionalData, setRegionalData] = useState<RegionalData[]>(defaultRegionalData);
  const [countryData, setCountryData] = useState<CountryData[]>(defaultCountryData);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>(defaultResearchProjects);
  const [programs, setPrograms] = useState<Program[]>(defaultPrograms);
  const [initiatives, setInitiatives] = useState<Initiative[]>(defaultInitiatives);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(defaultCalendarEvents);
  const [completionData, setCompletionData] = useState<CompletionData>(defaultCompletionData);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('acentrium_dashboard_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.dashboardMetrics) setDashboardMetrics(parsed.dashboardMetrics);
        if (parsed.regionalData) setRegionalData(parsed.regionalData);
        if (parsed.countryData) setCountryData(parsed.countryData);
        if (parsed.researchProjects) setResearchProjects(parsed.researchProjects);
        if (parsed.programs) setPrograms(parsed.programs);
        if (parsed.initiatives) setInitiatives(parsed.initiatives);
        if (parsed.calendarEvents) setCalendarEvents(parsed.calendarEvents);
        if (parsed.completionData) setCompletionData(parsed.completionData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      dashboardMetrics,
      regionalData,
      countryData,
      researchProjects,
      programs,
      initiatives,
      calendarEvents,
      completionData
    };
    localStorage.setItem('acentrium_dashboard_data', JSON.stringify(dataToSave));
  }, [dashboardMetrics, regionalData, countryData, researchProjects, programs, initiatives, calendarEvents, completionData]);

  // Dashboard Actions
  const updateDashboardMetrics = (metrics: Partial<DashboardMetrics>) => {
    setDashboardMetrics(prev => ({ ...prev, ...metrics }));
  };

  const updateRegionalData = (region: string, data: Partial<RegionalData>) => {
    setRegionalData(prev => prev.map(item => 
      item.region === region ? { ...item, ...data } : item
    ));
  };

  const updateCountryData = (country: string, data: Partial<CountryData>) => {
    setCountryData(prev => prev.map(item => 
      item.name === country ? { ...item, ...data } : item
    ));
  };

  // Research Actions
  const addResearchProject = (project: Omit<ResearchProject, 'id'>) => {
    const newId = Math.max(...researchProjects.map(p => p.id), 0) + 1;
    setResearchProjects(prev => [...prev, { ...project, id: newId }]);
  };

  const updateResearchProject = (id: number, project: Partial<ResearchProject>) => {
    setResearchProjects(prev => prev.map(p => 
      p.id === id ? { ...p, ...project } : p
    ));
  };

  const deleteResearchProject = (id: number) => {
    setResearchProjects(prev => prev.filter(p => p.id !== id));
  };

  // Program Actions
  const addProgram = (program: Program) => {
    setPrograms(prev => [...prev, program]);
  };

  const updateProgram = (name: string, program: Partial<Program>) => {
    setPrograms(prev => prev.map(p => 
      p.name === name ? { ...p, ...program } : p
    ));
  };

  const deleteProgram = (name: string) => {
    setPrograms(prev => prev.filter(p => p.name !== name));
  };

  // Initiative Actions
  const addInitiative = (initiative: Omit<Initiative, 'id'>) => {
    const newId = Math.max(...initiatives.map(i => i.id), 0) + 1;
    setInitiatives(prev => [...prev, { ...initiative, id: newId }]);
  };

  const updateInitiative = (id: number, initiative: Partial<Initiative>) => {
    setInitiatives(prev => prev.map(i => 
      i.id === id ? { ...i, ...initiative } : i
    ));
  };

  const deleteInitiative = (id: number) => {
    setInitiatives(prev => prev.filter(i => i.id !== id));
  };

  // Calendar Actions
  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newId = Date.now().toString();
    setCalendarEvents(prev => [...prev, { ...event, id: newId }]);
  };

  const updateCalendarEvent = (id: string, event: Partial<CalendarEvent>) => {
    setCalendarEvents(prev => prev.map(e => 
      e.id === id ? { ...e, ...event } : e
    ));
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents(prev => prev.filter(e => e.id !== id));
  };

  // Utility Functions
  const exportData = () => {
    const dataToExport = {
      dashboardMetrics,
      regionalData,
      countryData,
      researchProjects,
      programs,
      initiatives,
      calendarEvents,
      completionData,
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(dataToExport, null, 2);
  };

  const importData = (data: string) => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.dashboardMetrics) setDashboardMetrics(parsed.dashboardMetrics);
      if (parsed.regionalData) setRegionalData(parsed.regionalData);
      if (parsed.countryData) setCountryData(parsed.countryData);
      if (parsed.researchProjects) setResearchProjects(parsed.researchProjects);
      if (parsed.programs) setPrograms(parsed.programs);
      if (parsed.initiatives) setInitiatives(parsed.initiatives);
      if (parsed.calendarEvents) setCalendarEvents(parsed.calendarEvents);
      if (parsed.completionData) setCompletionData(parsed.completionData);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  const resetData = () => {
    setDashboardMetrics(defaultDashboardMetrics);
    setRegionalData(defaultRegionalData);
    setCountryData(defaultCountryData);
    setResearchProjects(defaultResearchProjects);
    setPrograms(defaultPrograms);
    setInitiatives(defaultInitiatives);
    setCalendarEvents(defaultCalendarEvents);
    setCompletionData(defaultCompletionData);
    localStorage.removeItem('acentrium_dashboard_data');
  };

  const contextValue: DataContextType = {
    dashboardMetrics,
    regionalData,
    countryData,
    completionData,
    researchProjects,
    programs,
    initiatives,
    calendarEvents,
    updateDashboardMetrics,
    updateRegionalData,
    updateCountryData,
    addResearchProject,
    updateResearchProject,
    deleteResearchProject,
    addProgram,
    updateProgram,
    deleteProgram,
    addInitiative,
    updateInitiative,
    deleteInitiative,
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    exportData,
    importData,
    resetData
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
