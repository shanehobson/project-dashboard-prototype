import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardFiltersComponent } from './project-dashboard-filters.component';

describe('ProjectDashboardFiltersComponent', () => {
  let component: ProjectDashboardFiltersComponent;
  let fixture: ComponentFixture<ProjectDashboardFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDashboardFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDashboardFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
