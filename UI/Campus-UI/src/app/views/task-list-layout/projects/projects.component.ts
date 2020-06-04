import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataHandlerService } from '../../../shared/services/data-handler.service';
import { Category } from '../../../model/category';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../../../dialog/edit-task-dialog/edit-task-dialog.component';
import { OperType } from '../../../dialog/OperType';
import { EditProjectDialogComponent } from '../../../dialog/edit-project-dialog/edit-project-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent implements OnInit {
  @Input()
  categories: Category[];

  @Input()
  selectedCategory: Category;

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<string>();

  todayDate: Date = new Date();

  constructor(
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataHandlerService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  showTasksByCategory(category: Category) {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;

    console.log(this.selectedCategory);
    this.selectCategory.emit(this.selectedCategory);
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      data: ['', 'Add project', OperType.ADD],
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addCategory.emit(result as string);
      }
    });
  }
}
