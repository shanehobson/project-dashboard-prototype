import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { ProjectDashboardTableComponent } from './components/project-dashboard-table/project-dashboard-table.component';
import { ProjectDashboardMetadataComponent } from './components/project-dashboard-metadata/project-dashboard-metadata.component';
import { SplitPipe } from './pipes/split.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FormatFilterValuesPipe } from './pipes/format-filter-values.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDashboardTableComponent,
    ProjectDashboardMetadataComponent,
    SplitPipe,
    FilterComponent,
    FiltersComponent,
    FormatFilterValuesPipe,
    SpinnerComponent,
    NavbarComponent,
    UnderConstructionComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FilterComponent, UnderConstructionComponent]
})
export class AppModule { }
