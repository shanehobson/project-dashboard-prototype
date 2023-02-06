import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, Subject, takeUntil } from 'rxjs';
import { Column } from 'src/app/interfaces/column';
import { ProjectFilter } from 'src/app/interfaces/project-filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  form: FormGroup = this.fb.group({
    column: new FormControl(null),
    operator: new FormControl({ value: null, disabled: true }),
    value: new FormControl(null),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
  });

  private unsubscribe$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { columns: Column[] },
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form.get('column')!.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(val => !!val))
      .subscribe((column: Column) => {
        this.form.get('operator')?.enable();
        this.form.patchValue({
          operator: column ? column.operators[0] : null, 
          value: null,
          date1: null,
          date2: null
        });
    });

    this.form.get('operator')!.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((operator) => {
        if (operator) {
          this.form.get('value')?.enable();
        } else {
          this.form.get('value')?.disable();
        }
      });
  }

  getOperatorOptions(): string[] {
    const column = this.form.get('column')?.value;
    if (!column) {
      return [];
    }
    return column.operators;
  }

  get disabled(): boolean {
    const { column, operator, value, startDate, endDate } = this.form.value;
    if (column && operator) {
      return !value && !(startDate && endDate);
    }
    return true;
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    let { column, operator, value, startDate, endDate } = this.form.value;
    if (startDate) {
      startDate = startDate.format('MM/DD/YYYY');
    }
    if (endDate) {
      endDate = endDate.format('MM/DD/YYYY');
    }
    const filter: ProjectFilter = {
      field: column.field,
      operator,
      values: operator === 'between' ? [ startDate, endDate ] : [ value ]
    }
    this.dialogRef.close({ filter });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
