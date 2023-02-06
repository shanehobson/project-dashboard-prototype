import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, take } from 'rxjs';
import * as moment from 'moment';
import * as uuid from 'uuid';
import { PageEvent } from '@angular/material/paginator';
import { Project} from '../interfaces/project';
import { Operator, ProjectFilter } from '../interfaces/project-filter';
import mockData from '../data/mock-data.json';
import { Column, columns } from '../interfaces/column';
import { MetadataService } from './metadata.service';
import { ProjectMetadata } from '../interfaces/project-metadata';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  allProjects: Project[] | null = null;
  private metadata$ = new BehaviorSubject<ProjectMetadata | null>(null);
  private projects$ = new BehaviorSubject<Project[]>(this.loadAllProjects());

  defaultPagination: PageEvent = {
    pageIndex: 0,
    pageSize: 15,
    previousPageIndex: 0,
    length: 0
  };
  private pagination: PageEvent = this.defaultPagination;
  private lastAppliedFilters: ProjectFilter[] = [];

  constructor(private metadataService: MetadataService) {}

  loadAllProjects(): Project[] {
    if (this.allProjects) {
      return this.allProjects;
    }
    const projects: Project[] = mockData.map((project: Project) => {
      // adding uuid in order to identify projects when updating
      return { ...project, id: uuid.v4() }
    });
    this.allProjects = projects;
    this.updateMetadata();
    return projects;
  }

  getProjects(): Observable<Project[]> {
    return this.projects$.
      pipe(
        delay(800), // Delaying response to simulate http call
        map(projects => {
          this.pagination.length = projects.length;
          return this.applyPagination(projects);
      }))
  }

  updateMetadata() {
    if (this.allProjects) {
      const metadata = this.metadataService.compileMetadata(this.allProjects);
      this.metadata$.next(metadata);
    }
  }

  getMetadata(): Observable<ProjectMetadata | null> {
    return this.metadata$;
  }

  updateFilters(filters: ProjectFilter[]) {
    let projects = [...this.allProjects as Project[]];
    for (const filter of filters) {
      projects = this.filterProjects(filter, projects);
    }
  
    this.pagination = this.defaultPagination;
    this.lastAppliedFilters = filters;
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

  updateProject(updatedProject: Project) {
    this.allProjects = this.allProjects!.map(project => {
      if (project.id === updatedProject.id) {
        return updatedProject;
      }
      return project;
    });
    this.updateFilters(this.lastAppliedFilters);
    this.updateMetadata();
  }

  getColumns(): Column[] {
    return columns;
  }
}
