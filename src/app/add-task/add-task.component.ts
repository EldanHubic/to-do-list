import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrudHttpService } from '../crud-http.service';
import { ITask } from '../tasks/itask';
import { format} from 'date-fns';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  constructor(private crudHttpService: CrudHttpService) {}
  sub!: Subscription;
  errorMessage: string = '';
  _text: string = '';
  _deadline: string = '';
  @Input() todo: ITask[] = [];
  id!: number;

  get deadline() {
    return this._deadline;
  }

  set deadline(date: string) {
    this._deadline = date;
  }

  ngOnInit(): void {
 
  }

  listTodos() {
    console.log('listTodos func');
    
    this.sub = this.crudHttpService.getTasks().subscribe({
      next: (task) => {
        this.todo = task;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

 

  addTodo(): void {
    const currentDate = format(new Date(), 'dd.MM.yyyy');
    let newDeadline: string[] = this.deadline.split('-');
    this._deadline = `${newDeadline[2]}.${newDeadline[1]}.${newDeadline[0]}`;
    let task = {
      id: this.id ,
      text: this._text,
      date: currentDate,
      done: false,
      deadline: this._deadline,
    };
    this.sub = this.crudHttpService.addTodo(task).subscribe((data) => {
      this.todo.push(data);
      console.log(data);
      this.listTodos()
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
