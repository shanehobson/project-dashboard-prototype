import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Column } from '../../interfaces/column';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-project-dashboard-table',
  templateUrl: './project-dashboard-table.component.html',
  styleUrls: ['./project-dashboard-table.component.scss']
})
export class ProjectDashboardTableComponent {
  @Input() projects: Project[] | null = [];
  @Input() loading = false;
  @Input() columns: Column[] = [];
  @Input() pagination: PageEvent | null = null;
  @Output() updatePagination = new EventEmitter<PageEvent>();

  pageSizeOptions = [ 5, 10, 20 ];

  constructor() { }

  onPaginatorEvent(event: PageEvent) {
    this.updatePagination.emit(event);
  }
}
