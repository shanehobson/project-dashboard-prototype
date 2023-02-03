import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProjectDashboardTableComponent } from './components/project-dashboard-table/project-dashboard-table.component';
import { ProjectDashboardMetadataComponent } from './components/project-dashboard-metadata/project-dashboard-metadata.component';
import { SplitPipe } from './pipes/split.pipe';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDashboardTableComponent,
    ProjectDashboardMetadataComponent,
    SplitPipe,
    FilterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
