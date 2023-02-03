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
export class AppComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  filters = new Map<ProjectField, ProjectFilter>()

  constructor(private projectService: ProjectService){}

  ngOnInit () {
    this.getProjects();
  }

  getProjects() {
    this.loading = true;
    this.projectService.getProjects(this.filters)
    .pipe(take(1))
    .subscribe(projects => {
      this.projects = projects;
      this.loading = false;
    })
  }

  updateFilter(filter: ProjectFilter) {
    this.filters.set(filter.field, filter);
    this.getProjects();
  }

  clearFilter(key: ProjectField) {
    this.filters.delete(key);
    this.getProjects();
  }

  clearFilters() {
    this.filters.clear();
    this.getProjects();
  }
}
