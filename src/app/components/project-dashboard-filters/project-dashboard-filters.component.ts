import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectField } from '../../interfaces/project';
import { ProjectFilter } from '../../interfaces/project-filter';

@Component({
  selector: 'app-project-dashboard-filters',
  templateUrl: './project-dashboard-filters.component.html',
  styleUrls: ['./project-dashboard-filters.component.scss']
})
export class ProjectDashboardFiltersComponent implements OnInit {
  @Output() updateFilters = new EventEmitter<Map<ProjectField, ProjectFilter>>();
  filters = new Map<ProjectField, ProjectFilter>();

  constructor() { }

  ngOnInit(): void {
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
