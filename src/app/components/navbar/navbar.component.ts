import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/interfaces/project';
import { UnderConstructionComponent } from '../under-construction/under-construction.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() selectedProject: Project | null = null;
  @Input() loading = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onViewSelectedProject() {
    this.onOpenUnderConstructionDialog();
  }

  onExportData() {
    this.onOpenUnderConstructionDialog();
  }

  onCreateProject() {
    this.onOpenUnderConstructionDialog();
  }

  onOpenUnderConstructionDialog() {
    this.dialog.open(UnderConstructionComponent, {
      height: '450px',
      width: '450px',
    });
  }

}
