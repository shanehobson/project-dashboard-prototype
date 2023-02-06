import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Project } from '../interfaces/project';
import { ProjectMetadata } from '../interfaces/project-metadata';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor() { }

  compileMetadata(projects: Project[]): ProjectMetadata {
    const metadata: ProjectMetadata = {
      totalProjects: 0,
      averageProjectBudget: 0,
      totalProjectsBudget: 0,
      averageProjectsPerProjectOwner: 0,
      numProjectOwners: 0,
      projectsCreatedInLastMonth: 0,
      projectsCreatedInLastYear: 0,
      projectsModifiedInLastMonth: 0,
      projectsModifiedInLastYear: 0,
    }

    const projectOwners = new Map<string, true>();

    for (const project of projects) {
      metadata.totalProjects++;
      metadata.totalProjectsBudget += project.budget;
      const created = moment(project.created);
      const modified = moment(project.modified);
      const now = moment(Date.now()).format('MM/DD/YYYY');
      const oneMonthAgo = moment(now).subtract(30, 'days');
      const oneYearAgo = moment(now).subtract(365, 'days');

      if (created.isAfter(oneMonthAgo)) {
        metadata.projectsCreatedInLastMonth++;
      }
      if (created.isAfter(oneYearAgo)) {
        metadata.projectsCreatedInLastYear++;
      }
      if (modified.isAfter(oneMonthAgo)) {
        metadata.projectsModifiedInLastMonth++;
      }
      if (modified.isAfter(oneYearAgo)) {
        metadata.projectsModifiedInLastYear++;
      }
      const projectOwner = project.project_owner;
      projectOwners.set(projectOwner, true);
    }

    metadata.averageProjectBudget = parseFloat(
      (metadata.totalProjectsBudget / metadata.totalProjects).toFixed(2)
    );
    metadata.numProjectOwners = projectOwners.size;
    metadata.averageProjectsPerProjectOwner = Math.floor(
      metadata.totalProjects / metadata.numProjectOwners
    );

    return metadata;
  }
}
