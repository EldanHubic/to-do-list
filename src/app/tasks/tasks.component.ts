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
  status: string = '';
  @Input() search: string = '';
  
  

  ngOnInit(): void {
   
  }

  listTodos() {
    this.sub = this.crudHttpService.getTasks().subscribe({
      next: (task) => {
        this.todo = task;
      },
      error: (err) => (this.errorMessage = err),
    });
  } 
  
  //obriši task
  deleteTodo(id: number): void {
    this.crudHttpService.deleteTodo(id).subscribe((data) => {
      this.todo.splice(id, 1);
      this.status = "Delete successful";
      console.log(this.status);
      
      this.listTodos();
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
