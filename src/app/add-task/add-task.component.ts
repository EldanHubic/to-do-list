import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrudHttpService } from '../crud-http.service';
import { ITask } from '../tasks/itask';
import { format } from 'date-fns';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    private crudHttpService: CrudHttpService,
    private fb: FormBuilder
  ) {}
  sub!: Subscription;
  status: string = '';
  errorMessage: string = '';
  _text: string = '';
  _deadline: string = '';
  isAdded: boolean = false;
  addFail: boolean = false;
  deadlineMsg: string = 'Deadline date already passed!';
  @Input() todo: ITask[] = [];
  @Input() filterArray: ITask[] = [];
  id!: number;
  minDate = new Date();

  get deadline() {
    return this._deadline;
  }

  set deadline(date: string) {
    this._deadline = date;
  }

  ngOnInit(): void {}

  FadeOutLink(): void {
    setTimeout(() => {
      this.isAdded = false;
      this.addFail = false;
    }, 3500);
  }

 
  addTodo(): void {
    const currentDate = format(new Date(), 'dd.MM.yyyy');
    let newDeadline: string[] = this.deadline.toString().split('-');
    this._deadline = `${newDeadline[2]}.${newDeadline[1]}.${newDeadline[0]}`;
    let arr = currentDate.split('.');
    // console.log(this._deadline);
    // console.log(arr);

    //ako je unesena godina veca nego trenutna
    if (newDeadline[0] >= arr[2]) {
      // console.log('unesena godina veca ili jednaka nego trenutna');

      if (newDeadline[1] >= arr[1]) {
        // console.log('uneseni mjesec veci ili jednak nego trenutni');
        if (
          (Number(newDeadline[2]) >= Number(arr[0]) &&
            Number(newDeadline[1]) === Number(arr[1])) ||
          (Number(newDeadline[2]) <= Number(arr[0]) &&
            Number(newDeadline[1]) > Number(arr[1]))
        ) {
          let task = {
            id: this.id,
            text: this._text,
            date: currentDate,
            done: false,
            deadline: this._deadline,
          };
          this.sub = this.crudHttpService.addTodo(task).subscribe((data) => {
            this.todo.push(data);
            this._text = '';
            this.status = `Task: ${task.text} successfuly added to list.`;
            this.isAdded = true;
            this.FadeOutLink();
          
            
          });
        } else {
          this.status = this.deadlineMsg;
          this.addFail = true;
          this.FadeOutLink();
        }
      } else {
        this.status = this.deadlineMsg;
        this.addFail = true;
        this.FadeOutLink();
      }
    } else {
      this.status = this.deadlineMsg;
      this.addFail = true;
      this.FadeOutLink();
    }

    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
