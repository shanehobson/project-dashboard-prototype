import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProjectDashboardTableComponent } from './project-dashboard-table/project-dashboard-table.component';
import { ProjectDashboardMetadataComponent } from './project-dashboard-metadata/project-dashboard-metadata.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDashboardTableComponent,
    ProjectDashboardMetadataComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
