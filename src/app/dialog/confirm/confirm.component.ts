import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmDialogData } from '../iconfirm-dialog-data';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData) {}

  // cancel() {
  //   this.dialogRef.close({data: 'cancel'});
  // }

  // confirm() {
  //   this.dialogRef.close({data: 'confirmed'});
  // }

  ngOnInit(): void {}
}
