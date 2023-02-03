import { Project, ProjectField } from "./project";

export interface ProjectFilter {
  field: ProjectField;
  operator: Operator;
  values: Project[ProjectField][];
}

export enum Operator {
  Equals = 'equals',
  Between = 'between',
}

