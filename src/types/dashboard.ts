// Dashboard Data Types

export interface DashboardMetrics {
  students: number;
  projects: number;
  countries: number;
  partners: number;
  change: string;
  projectsChange: string;
  countriesChange: string;
  partnersChange: string;
}

export interface RegionalData extends DashboardMetrics {
  region: string;
}

export interface ResearchProject {
  id: number;
  title: string;
  description: string;
  stage: 'planning' | 'in-progress' | 'review' | 'completed';
  startDate: string;
  expectedCompletion: string;
  teamSize: number;
  funding: string;
  impact: string;
  category: 'education' | 'healthcare' | 'agriculture' | 'finance' | 'governance';
}

export interface Program {
  name: string;
  enrolled: number;
  completed: number;
  completionRate: number;
  avgDuration: string;
  color: string;
}

export interface Initiative {
  id: number;
  title: string;
  description: string;
  category: 'education' | 'research' | 'community' | 'policy';
  status: 'active' | 'completed' | 'planned';
  date: string;
  participants?: number;
  impact?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  extendedProps: {
    calendar: string;
  };
}

export interface CountryData {
  name: string;
  students: number;
  projects: number;
  status: 'active' | 'expanding' | 'new';
  region: string;
}

import { ApexOptions } from 'apexcharts';

export interface CompletionData {
  series: Array<{
    name: string;
    data: number[];
  }>;
  options: ApexOptions;
}

export type AdminSection = 'dashboard' | 'research' | 'programs' | 'initiatives' | 'calendar' | 'settings';
