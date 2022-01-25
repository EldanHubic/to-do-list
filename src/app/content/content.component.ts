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
  search: string = '';
  
  get getSearch() {
    return this.search;
  }

  set setSearch(value: string) {
    this.search = value;
    console.log(value);
    
    
  }

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

  
}
