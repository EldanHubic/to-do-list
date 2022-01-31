import { Component, Input, OnInit } from '@angular/core';
import { CrudHttpService } from 'src/app/crud-http.service';
import { ITask } from 'src/app/tasks/itask';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input() todo: ITask[] = [];
  @Input() filterArray: ITask[] = [];
  constructor(private crudHttpService: CrudHttpService) { }
  status: string = '';
  isDeletedFlag: boolean = false;
  notDeleted: boolean = false;
  @Input() selectToDeleteTask?: ITask;
  dialog: boolean = false;
  ngOnInit(): void {
  }


 
}
