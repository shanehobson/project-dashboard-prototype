import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardTableComponent } from './project-dashboard-table.component';

describe('ProjectDashboardTableComponent', () => {
  let component: ProjectDashboardTableComponent;
  let fixture: ComponentFixture<ProjectDashboardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDashboardTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
