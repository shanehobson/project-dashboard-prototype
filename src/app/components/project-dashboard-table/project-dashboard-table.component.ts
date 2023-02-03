import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectFilter } from 'src/app/interfaces/project-filter';
import { Column } from '../../interfaces/column';
import { Project, ProjectField } from '../../interfaces/project';

@Component({
  selector: 'app-project-dashboard-table',
  templateUrl: './project-dashboard-table.component.html',
  styleUrls: ['./project-dashboard-table.component.scss']
})
export class ProjectDashboardTableComponent implements OnInit {
  @Input() projects: Project[] | null = [];
  @Input() loading = false;
  @Input() columns: Column[] = [];
  @Output() updateFilters = new EventEmitter<Map<ProjectField, ProjectFilter>>();



  constructor() { }

  ngOnInit(): void {
  }

 

}
