import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { Project, ProjectField } from './interfaces/project';
import { Operator, ProjectFilter } from './interfaces/project-filter';
import mockData from './mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] | null = null;

  getProjects(filters: Map<ProjectField, ProjectFilter>): Observable<Project[]> {
    if (!this.projects) {
      this.projects = mockData;
    }

    let projects = [...this.projects!];
    for (const filter of filters.values()) {
      projects = this.filterProjects(filter, projects);
    }

    // Returning an observable in order to mock the behavior of an actual HTTP call.
    return of(projects);
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

    })
  }
}
