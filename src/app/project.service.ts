import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, } from 'rxjs';
import * as moment from 'moment';
import { Project, ProjectField } from './interfaces/project';
import { Operator, ProjectFilter } from './interfaces/project-filter';
import mockData from './mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects$ = new BehaviorSubject<Project[]>(mockData);

  getProjects(): Observable<Project[]> {
    return this.projects$.asObservable();
  }

  updateFilters(filters: Map<ProjectField, ProjectFilter>) {
    let projects = [...mockData];
    for (const filter of filters.values()) {
      projects = this.filterProjects(filter, projects);
    }
    this.projects$.next(projects);
  }

  filterProjects(filter: ProjectFilter, projects: Project[]): Project[] {
    return projects.filter(project => {
      const { field, operator, values } = filter;
      switch (operator) {
        case Operator.Equals:
          return project[field] === values[0];
        case Operator.Between:
          const [start, end] = values
          .slice(0, 2)
          .map(value => moment(value));
          const dateToTest = moment(project[field]);
          return dateToTest.isBetween(start, end, 'day');
          default:
            throw new Error(`Operator ${operator} does not exist.`);
      }
    });
  }
}
