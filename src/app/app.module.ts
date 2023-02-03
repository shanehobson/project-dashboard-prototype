import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ProjectDashboardTableComponent } from './components/project-dashboard-table/project-dashboard-table.component';
import { ProjectDashboardMetadataComponent } from './components/project-dashboard-metadata/project-dashboard-metadata.component';
import { SplitPipe } from './pipes/split.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FormatFilterValuesPipe } from './pipes/format-filter-values.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDashboardTableComponent,
    ProjectDashboardMetadataComponent,
    SplitPipe,
    FilterComponent,
    FiltersComponent,
    FormatFilterValuesPipe
  ],
  imports: [
    BrowserModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
