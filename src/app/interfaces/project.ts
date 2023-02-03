export interface Project {
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

}

export enum ProjectStatus {
  Archived = 'archived',

}
