import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, take } from 'rxjs';
import * as moment from 'moment';
import { Project, ProjectField } from '../interfaces/project';
import { Operator, ProjectFilter } from '../interfaces/project-filter';
import mockData from '../data/mock-data.json';
import { Column, columns } from '../interfaces/column';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects$ = new BehaviorSubject<Project[]>(mockData);

  defaultPagination: PageEvent = {
    pageIndex: 0,
    pageSize: 20,
    previousPageIndex: 0,
    length: 0
  };
  private pagination: PageEvent = this.defaultPagination;

  getProjects(): Observable<Project[]> {
    return this.projects$.
      pipe(
        delay(800), // Delaying response to simulate http call
        map(projects => {
          this.pagination.length = projects.length;
          return this.applyPagination(projects);
      }))
  }

  updateFilters(filters: ProjectFilter[]) {
    let projects = [...mockData];
    for (const filter of filters) {
      projects = this.filterProjects(filter, projects);
    }
  
    this.pagination = this.defaultPagination;
    this.projects$.next(projects);
  }

  filterProjects(filter: ProjectFilter, projects: Project[]): Project[] {
    return projects.filter(project => {
      const { field, operator, values } = filter;
      switch (operator) {

        case Operator.Equals:
          if (typeof project[field] === 'string') {
            const projectField: string = project[field] as string;
            return projectField.toLowerCase() === values[0].toString().toLowerCase();
          } else {
            return project[field] === values[0];
          }
   

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

  getColumns(): Column[] {
    return columns;
  }

  updatePagination(event: PageEvent) {
    this.projects$.pipe(take(1)).subscribe(projects => {
      this.pagination = event;
      this.projects$.next(projects);
    });
  }

  applyPagination(projects: Project[]): Project[] {
    const { pageIndex, pageSize } = this.pagination;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    return projects.slice(startIndex, endIndex);
  }

  getPagination(): PageEvent {
    return this.pagination;
  }
}
