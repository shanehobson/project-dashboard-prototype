import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Column } from 'src/app/interfaces/column';
import { ProjectField } from 'src/app/interfaces/project';
import { ProjectFilter } from 'src/app/interfaces/project-filter';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Input() columns: Column[] = [];
  @Input() loading = false;
  @Output() updateFilters = new EventEmitter<Map<ProjectField, ProjectFilter>>();

  filters = new Map<ProjectField, ProjectFilter>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  this.onOpenFilterDialog();
  }

  onOpenFilterDialog(filter: ProjectFilter | null = null) {
    let dialogRef: MatDialogRef<FilterComponent> = this.dialog.open(FilterComponent, {
      height: '370px',
      width: '500px',
      data: {
        columns: this.columns,
        filter
      }
    });

    dialogRef.afterClosed().subscribe((filter: ProjectFilter) => {
      if (filter) {
        this.onUpdateFilter(filter);
      }
    });
  }

  onUpdateFilter(filter: ProjectFilter) {
    this.filters.set(filter.field, filter);
    this.updateFilters.emit(this.filters);
  }

  onClearFilter(key: ProjectField) {
    this.filters.delete(key);
    this.updateFilters.emit(this.filters);
  }

  onClearFilters() {
    this.filters.clear();
    this.updateFilters.emit(this.filters);
  }

}
