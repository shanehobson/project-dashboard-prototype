import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardMetadataComponent } from './project-dashboard-metadata.component';

describe('ProjectDashboardMetadataComponent', () => {
  let component: ProjectDashboardMetadataComponent;
  let fixture: ComponentFixture<ProjectDashboardMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDashboardMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDashboardMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
