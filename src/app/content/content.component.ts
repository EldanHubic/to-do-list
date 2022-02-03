import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrudHttpService } from '../crud-http.service';
import { ITask } from '../tasks/itask';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, OnDestroy {
  constructor(private crudHttpService: CrudHttpService) {}
  tasks: ITask[] = [];
  sub!: Subscription;
  errorMessage: string = '';

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
}
