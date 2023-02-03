import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { Project } from './interfaces/project';
import { Operator, ProjectFilter } from './interfaces/project-filter';
import mockData from './mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  initialized = false;
  projects: Project[] = [];

  constructor() { 
  }

  init(){
    this.projects = JSON.parse(mockData);
    this.initialized = true;
  }

  getProjects(filters: ProjectFilter[] = []): Observable<Project[]> {
    let projects = [...this.projects];
    for (const filter of filters) {
      projects = this.filterProjects(filter, projects);
    }
    return of([]);
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
