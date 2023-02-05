import { Component, EventEmitter, Input,  OnChanges,  OnDestroy,  OnInit,  Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { Column } from '../../interfaces/column';
import { Project } from '../../interfaces/project';

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
  changesPending = false;
  successAnimationId: string = '';

  form: FormGroup = this.fb.group({
    title: new FormControl(null),
    division: new FormControl(null),
    project_owner: new FormControl(null),
    budget: new FormControl(null),
    status: new FormControl(null),
  });

  pageSizeOptions = [ 5, 10, 20 ];

  private unsubscribe$ = new Subject();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.changesPending = true;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projects'] && this.projectBeingSaved) {
      this.showSuccessAnimation(this.projectBeingSaved);
      this.projectBeingSaved = null;
    }
  }

  showSuccessAnimation(project: Project) {
    this.successAnimationId = project.id;
    setTimeout(() => {
      this.successAnimationId = '';
    }, 4000)
  }

  onPaginatorEvent(event: PageEvent) {
    this.updatePagination.emit(event);
  }

  onSelectProject(project: Project) {
    this.selectedProject = project;
    this.form.patchValue({
      title: project.title,
      division: project.division.toLowerCase(),
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
    this.form.reset();
    this.selectedProject = null;
    this.changesPending = false;
    this.projectBeingSaved = project;
    this.updateProject.emit(project);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
