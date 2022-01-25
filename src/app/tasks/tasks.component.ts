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

  updateTodo(task: ITask): void {
    let data = {
      id: 10,
      text: "Editovani task",
      date: "neki datum",
      done: true,
      deadline: "neki deadline" 
    }
    this.crudHttpService.updateTask(task.id, data).subscribe((response)=>{
      window.location.reload();
    },(error=>{

    }));
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
