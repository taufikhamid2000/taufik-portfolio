export type PesLocale = 'en' | 'ms';

export interface PesMinistry {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  initiative_count: number;
}

export interface PesInitiative {
  id: string;
  ministry_slug: string;
  ministry_name: string;
  problem: string;
  idea: string;
  status: 'active' | 'planned' | 'concept';
  project_name: string | null;
  demo_url: string | null;
  github_url: string | null;
}

export interface PesVisionData {
  ministries: PesMinistry[];
  initiatives: PesInitiative[];
}

export interface PesSprint {
  id: string;
  name: string;
  goal: string | null;
  start_date: string | null;
  end_date: string | null;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  task_count: number;
  done_count: number;
}

export interface PesSite {
  name: string;
  fullName: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string | null;
  resumeUrl: string | null;
  availability: string;
}
