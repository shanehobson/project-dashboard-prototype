import { Component, EventEmitter, Input,  OnChanges,  OnDestroy,  OnInit,  Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { Column } from '../../interfaces/column';
import { Project, ProjectField } from '../../interfaces/project';

@Component({
  selector: 'app-project-dashboard-table',
  templateUrl: './project-dashboard-table.component.html',
  styleUrls: ['./project-dashboard-table.component.scss']
})
export class ProjectDashboardTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() projects: Project[] | null = [];
  @Input() loading = false;
  @Input() columns: Column[] = [];
  @Input() pagination: PageEvent | null = null;
  @Output() updatePagination = new EventEmitter<PageEvent>();
  @Output() updateProject = new EventEmitter<Project>();

  selectedProject: Project | null = null;
  projectBeingSaved: Project | null = null;
  projectLastSaved: Project | null = null;
  fieldsUpdated = new Map<string, boolean>;
  changesPending = false;
  pageSizeOptions = [ 5, 10, 20 ];
  timerId: NodeJS.Timeout | undefined = undefined;

  form: FormGroup = this.fb.group({
    title: new FormControl(null),
    division: new FormControl(null),
    project_owner: new FormControl(null),
    budget: new FormControl(null),
    status: new FormControl(null),
  });

  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar){ }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.changesPending = true;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projects']) {
      if (this.projectBeingSaved) {
        this.displaySuccessNotification();
      }
      this.projectLastSaved = this.projectBeingSaved;
      this.projectBeingSaved = null;
      this.selectedProject = null;
    }
  }

  onPaginatorEvent(event: PageEvent) {
    this.projectLastSaved = null;
    this.fieldsUpdated.clear();
    this.updatePagination.emit(event);
  }

  onSelectProject(project: Project) {
    this.selectedProject = project;
    this.projectLastSaved = null;
    this.fieldsUpdated.clear();
    this.form.patchValue({
      title: project.title,
      division: project.division,
      project_owner: project.project_owner,
      budget: project.budget,
      status: project.status
    });
    this.changesPending = false;
  }

  onSaveProject() {
    if (!this.changesPending) {
      return;
    }

    const { title, division, project_owner, budget, status } = this.form.value;
    const project: Project = {
      id: this.selectedProject?.id as string,
      title,
      division,
      project_owner,
      budget,
      status,
      created: this.selectedProject?.created as string,
      modified: moment(Date.now()).format('MM/DD/YYYY')
    }

    this.fieldsUpdated.clear();
    const projectFields: ProjectField[] = [ 'title', 'division', 'project_owner', 'budget', 'status'];
    for (const field of projectFields) {
      if (project[field] !== this.selectedProject![field]) {
        this.fieldsUpdated.set(field, true);
      }
    }

    this.changesPending = false;
    this.selectedProject = null;
    this.projectBeingSaved = project;
    this.form.reset();
    this.updateProject.emit(project);
  }

  displaySuccessNotification() {
    let message = `Success! Updated field${this.fieldsUpdated.size !== 1 ? 's' : ''}: `;
    for (const field of this.fieldsUpdated.keys()) {
      message += field + ', '
    }
    message = message.slice(0, message.length - 2) + '.';
    this.openSnackBar(message, 'Dismiss', 7000)
  }

  openSnackBar(message: string, action: string, timeout: number) {
    this._snackBar.open(message, action);
    setTimeout(() => {
      this._snackBar.dismiss();
    }, timeout)
  }

  fieldWasUpdated(project: Project, field: ProjectField): boolean {
    return this.fieldsUpdated.has(field) && this.projectLastSaved?.id === project.id;
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
