import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Project, ProjectField } from './interfaces/project';
import { ProjectFilter } from './interfaces/project-filter';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  projects$ = this.projectService.getProjects();
  filters = new Map<ProjectField, ProjectFilter>();

  constructor(private projectService: ProjectService){}

  updateFilter(filter: ProjectFilter) {
    this.filters.set(filter.field, filter);
    this.projectService.updateFilters(this.filters);
  }

  clearFilter(key: ProjectField) {
    this.filters.delete(key);
    this.projectService.updateFilters(this.filters);
  }

  clearFilters() {
    this.filters.clear();
    this.projectService.updateFilters(this.filters);
  }
}
