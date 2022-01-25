import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrudHttpService } from '../crud-http.service';
import { ITask } from './itask';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(private crudHttpService: CrudHttpService) {}
  @Input() todo: ITask[] = [];
  
  isComplete: boolean = false;
  sub!: Subscription;
  errorMessage = '';

  
  ngOnInit(): void {
      
  }
  //ispiši sve todo
  

  deleteTodo(tasks: ITask): void {
    this.crudHttpService.deleteTodo(tasks).subscribe((data) => {
      console.log(data);
      window.location.reload();
    });
  }

  @Input() updateTodo(task: ITask): void {

  }

  @Input() getTextValue(): void {
    
  }
 

  completeTask(): void {
    if(this.isComplete) {
      this.isComplete = false;
    } else {
      this.isComplete = true;
    }
  }

  // filterTasks(value: string): ITask[] {
  //   value.toLocaleLowerCase();
  //   return this.todo.filter((task: ITask) => {
  //     task.text.toLocaleLowerCase().includes(value);
  //   });
  // }

}
