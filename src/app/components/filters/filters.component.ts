import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectField } from 'src/app/interfaces/project';
import { Operator, ProjectFilter } from 'src/app/interfaces/project-filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() updateFilters = new EventEmitter<Map<ProjectField, ProjectFilter>>();

  filters = new Map<ProjectField, ProjectFilter>();

  constructor() { }

  ngOnInit(): void {
    this.filters.set('title', {
      field: 'title',
      operator: Operator.Equals,
      values: ['Tagtune']
    })
    this.filters.set('project_owner', {
      field: 'project_owner',
      operator: Operator.Equals,
      values: ['Kevin Snyder']
    })
    this.filters.set('created', {
      field: 'created',
      operator: Operator.Between,
      values: ['08/31/2013', '10/31/2015']
    }),
    this.filters.set('modified', {
      field: 'created',
      operator: Operator.Between,
      values: ['08/31/2013', '10/31/2015']
    })
  }

  updateFilter(filter: ProjectFilter) {
    this.filters.set(filter.field, filter);
    this.updateFilters.emit(this.filters);
  }

  clearFilter(key: ProjectField) {
    this.filters.delete(key);
    this.updateFilters.emit(this.filters);
  }

  clearFilters() {
    this.filters.clear();
    this.updateFilters.emit(this.filters);
  }

}
