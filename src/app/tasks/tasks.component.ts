import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() filterArray: ITask[] = [];
  isComplete: boolean = false;
  sub!: Subscription;
  errorMessage = '';
  status: string = '';
  newText = '';
  newDeadline = '';
  private _search: string = '';
  selectedTask: ITask = {
    id: 0,
    text: '',
    date: '',
    done: false,
    deadline: '',
  };
  isEdited: boolean = false;

  get search() {
    return this._search;
  }

  set search(searchParam: string) {
    this._search = searchParam;
    this.filterArray = this.filterTasks(searchParam);
    console.log(this.filterArray);
    console.log(this._search);
  }


  set deadline(value: string) {
    this.newDeadline = value;
  }

  isClicked: boolean = false;

  ngOnInit(): void {}

  //obriši task
  deleteTodo(id: number): void {
    this.crudHttpService.deleteTodo(id).subscribe((data) => {
      const index = this.todo.findIndex((el) => el.id === id);
      if (id > -1) {
        this.todo.splice(index, 1);
      }
    });
  }

  //update task
  showHideEdit(task: ITask): void {
    this.selectedTask = {
      id: task.id,
      text: task.text,
      date: task.date,
      done: task.done,
      deadline: task.deadline,
    };
    console.log(this.selectedTask);
    this.isClicked = true;
    console.log(this.isClicked);
  }

  updateTodo(task: ITask) {
    let _newDeadline = this.newDeadline.split('-');
    this.newDeadline = `${_newDeadline[2]}.${_newDeadline[1]}.${_newDeadline[0]}`;
    let newTask = {
      id: task.id,
      text: this.newText,
      date: task.date,
      done: task.done,
      deadline: this.newDeadline,
    };
    this.sub = this.crudHttpService.updateTask(task.id, newTask).subscribe(
      () => {
        const index = this.todo.findIndex(
          (el) => el.id === this.selectedTask.id
        );
        if (this.selectedTask.id > -1) {
          this.todo.splice(index, 1, newTask);
          this.newText = '';
        }
        this.selectedTask = {
          id: 0,
          text: '',
          date: '',
          done: false,
          deadline: '',
        };
      },
      (error) => {}
    );
    this.isClicked = false;
    console.log(this.selectedTask);
  }

  cancel(): void {
    this.isClicked = false;
    this.selectedTask = {
      id: 0,
      text: '',
      date: '',
      done: false,
      deadline: '',
    };
  }

  // MyCtrl($scope: any, $filter: any) {
  //   $scope.date = $filter('date')(Date.now(), 'yyyy-MM-dd');
  // }

  filterTasks(value: string): ITask[] {
    value.toLocaleLowerCase();
    return this.todo.filter((task: ITask) =>
      task.text.toLocaleLowerCase().includes(value)
    );
  
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
