import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrudHttpService } from '../crud-http.service';
import { ITask } from '../tasks/itask';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  constructor(private crudHttpService: CrudHttpService) {}
  tasks: ITask[] = [];
  sub!: Subscription;
  errorMessage: string = '';
  // _search: string = '';
  
  // get search() {
  //   return this._search;
  // }

  // set search(value: string) {
  //   this._search = value;
  //   this.filterArray = this.filterTasks(value);    
  // }

  ngOnInit(): void {
    this.listTodos();
  }

  //ispiši sve todo
  listTodos() {
    this.sub = this.crudHttpService.getTasks().subscribe({
      next: (task) => {
        this.tasks = task;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  


  // filterTasks(value: string): ITask[] {
  //   value.toLocaleLowerCase();
  //   return this.tasks.filter((task: ITask) => {
  //     task.text.toLocaleLowerCase().includes(value);
  //   });
  // }
  
}
