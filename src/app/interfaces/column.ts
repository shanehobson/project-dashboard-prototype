import { Division, ProjectField, ProjectStatus } from "./project";
import { Operator } from "./project-filter";

export interface Column {
  field: ProjectField,
  operator: Operator,
  type: FieldType,
  options?: string[]
}

export type FieldType = 'string' | 'number' | 'date' | 'select';

export const columns: Column[] = [
  {
    field: 'title',
    operator: Operator.Equals,
    type: 'string'
  },
  {
    field: 'division',
    operator: Operator.Equals,
    type: 'select',
    options: [
      Division.Accounting,
      Division.Administration,
      Division.Marketing,
      Division.Production,
      Division.Sales
    ]
  },
  {
    field: 'project_owner',
    operator: Operator.Equals,
    type: 'string'
  },
  {
    field: 'budget',
    operator: Operator.Equals,
    type: 'number'
  },
  {
    field: 'status',
    operator: Operator.Equals,
    type: 'select',
    options: [
      ProjectStatus.Archived,
      ProjectStatus.Delivered,
      ProjectStatus.New,
      ProjectStatus.Working
    ]
  },
  {
    field: 'created',
    operator: Operator.Between,
    type: 'date'
  },
  {
    field: 'modified',
    operator: Operator.Between,
    type: 'date'
  }
]