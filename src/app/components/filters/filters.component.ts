import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Column } from 'src/app/interfaces/column';
import { ProjectFilter } from 'src/app/interfaces/project-filter';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent  {
  @Input() columns: Column[] = [];
  @Input() loading = false;
  @Output() updateFilters = new EventEmitter<ProjectFilter[]>();

  filters: ProjectFilter[] = [];

  constructor(public dialog: MatDialog) { }

  onOpenFilterDialog() {
    let dialogRef: MatDialogRef<FilterComponent> = this.dialog.open(FilterComponent, {
      height: '370px',
      width: '500px',
      data: {
        columns: this.columns
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data?.filter) {
        this.onUpdateFilter(data.filter);
      }
    });
  }

  onReplaceFilter(newFilter: ProjectFilter, oldFilter: ProjectFilter) {
    this.filters = this.filters.map(filter => {
      if (filter === oldFilter) {
        return newFilter;
      }
      return filter;
    })
    this.updateFilters.emit(this.filters);
  }

  onUpdateFilter(filter: ProjectFilter) {
    this.filters.push(filter);
    this.updateFilters.emit(this.filters);
  }

  onClearFilter(filter: ProjectFilter) {
    this.filters = this.filters.filter(item => item !== filter);
    this.updateFilters.emit(this.filters);
  }

  onClearFilters() {
    this.filters =[];
    this.updateFilters.emit(this.filters);
  }
}
