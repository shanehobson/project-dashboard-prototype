import { Division, ProjectField, ProjectStatus } from "./project";
import { Operator } from "./project-filter";

export interface Column {
  field: ProjectField,
  operators: Operator[],
  type: FieldType,
  options?: string[]
}

export type FieldType = 'string' | 'number' | 'date' | 'select';

export const columns: Column[] = [
  {
    field: 'title',
    operators: [ Operator.Equals, Operator.Contains ],
    type: 'string'
  },
  {
    field: 'division',
    operators: [ Operator.Equals ],
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
    operators: [ Operator.Equals, Operator.Contains ],
    type: 'string'
  },
  {
    field: 'budget',
    operators: [ Operator.Equals, Operator.GreaterThan, Operator.LessThan ],
    type: 'number'
  },
  {
    field: 'status',
    operators: [ Operator.Equals ],
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
    operators: [ Operator.Between ],
    type: 'date'
  },
  {
    field: 'modified',
    operators: [ Operator.Between ],
    type: 'date'
  }
];