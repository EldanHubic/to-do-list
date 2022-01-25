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
  @Input() fArray: ITask[] = [];
  isComplete: boolean = false;
  sub!: Subscription;
  errorMessage = '';
  @Input() search: string = '';
  
  

  ngOnInit(): void {
      
  }
  
  
  //obriši task
  deleteTodo(tasks: ITask): void {
    this.crudHttpService.deleteTodo(tasks).subscribe((data) => {
      console.log(data);
      window.location.reload();
    });
  }

  //update task
  updateTodo(task: ITask): void {
    let data = {
      id: 10,
      text: "Editovani task",
      date: "Editovani datum",
      done: true,
      deadline: "Editovani deadline" 
    }
    this.sub = this.crudHttpService.updateTask(task.id, data).subscribe((response)=>{
      window.location.reload();
    },(error=>{

    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  

}
