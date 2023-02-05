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
  Accounting = 'Accounting',
  Administration = 'Administration',
  Marketing = 'Marketing',
  Production = 'Production',
  Sales = 'Sales'
}

export enum ProjectStatus {
  Archived = 'archived',
  Delivered = 'delivered',
  New = 'new',
  Working = 'working'
}
