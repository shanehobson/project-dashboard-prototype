export interface Project {
  id: string;
  title: string,
  division: Division,
  project_owner: string,
  budget: number,
  status: ProjectStatus,
  created: string,
  modified: string
}

export type ProjectField = keyof Project;

export enum Division {
  Accounting = 'accounting',
  Administration = 'administration',
  Marketing = 'marketing',
  Production = 'production',
  Sales = 'sales'
}

export enum ProjectStatus {
  Archived = 'archived',
  Delivered = 'delivered',
  New = 'new',
  Working = 'working'
}
