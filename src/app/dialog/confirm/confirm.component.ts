import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CrudHttpService } from 'src/app/crud-http.service';
import { ITask } from 'src/app/tasks/itask';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
 
  constructor(private dialogRef: MatDialogRef<ConfirmComponent>) { }
 
  cancel() {
    this.dialogRef.close({data: 'cancel'});
  }

  confirm() {
    this.dialogRef.close({data: 'confirmed'});
  }

  ngOnInit(): void {
  }




 
}
