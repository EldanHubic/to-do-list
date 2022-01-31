import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../dialog/confirm/confirm.component';
import { TasksComponent } from '../tasks/tasks.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(): void{
    this.dialog.open(ConfirmComponent);
  }
}
