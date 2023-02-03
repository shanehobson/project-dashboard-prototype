import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { Column } from './interfaces/column';
import { Project, ProjectField } from './interfaces/project';
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
  loading = false;
 
  constructor(private projectService: ProjectService){}

  ngOnInit() {
    this.columns = this.projectService.getColumns();
  }

  onUpdateFilters(filters: Map<ProjectField, ProjectFilter>) {
    this.projectService.updateFilters(filters);
  }
}
