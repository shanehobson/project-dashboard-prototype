import { Component, Input, OnInit } from '@angular/core';
import { ProjectMetadata } from 'src/app/interfaces/project-metadata';

@Component({
  selector: 'app-project-dashboard-metadata',
  templateUrl: './project-dashboard-metadata.component.html',
  styleUrls: ['./project-dashboard-metadata.component.scss']
})
export class ProjectDashboardMetadataComponent implements OnInit {
  @Input() metadata: ProjectMetadata | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}


