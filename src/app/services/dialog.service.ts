import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../dialog/confirm/confirm.component';
import { IConfirmDialogData } from '../dialog/iconfirm-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(data: IConfirmDialogData): Observable<boolean> {
   return this.dialog.open(ConfirmComponent, {
     data,
     width: '400px',
     disableClose: true,
   }).afterClosed();
  }
}




