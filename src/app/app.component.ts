import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {  tap } from 'rxjs';
import { Column } from './interfaces/column';
import { Project } from './interfaces/project';
import { ProjectFilter } from './interfaces/project-filter';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  projects$ = this.projectService.getProjects()
    .pipe(tap(() => this.loading = false));

  columns: Column[] = [];
  loading = true;
 
  constructor(private projectService: ProjectService){}

  ngOnInit() {
    this.columns = this.projectService.getColumns();
  }

  onUpdateFilters(filters: ProjectFilter[]) {
    this.loading = true;
    this.projectService.updateFilters(filters);
  }

  onUpdatePagination(event: PageEvent) {
    this.loading = true;
    this.projectService.updatePagination(event);
  }

  onUpdateProject(project: Project) {
    this.loading = true;
    this.projectService.updateProject(project);
  }

  get pagination(): PageEvent {
    return this.projectService.getPagination();
  }
}
