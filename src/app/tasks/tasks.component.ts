import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrudHttpService } from '../crud-http.service';
import { ITask } from './itask';
import { format } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../dialog/confirm/confirm.component';
import { DialogService } from '../services/dialog.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(
    private crudHttpService: CrudHttpService,
    private dialog: MatDialog,
    private dialogService: DialogService
   
  ) {}
  @Input() todo: ITask[] = [];
  @Input() filterArray: ITask[] = [];
  isComplete: boolean = false;
  sub!: Subscription;
  errorMessage = '';
  status: string = '';
  newText = '';
  newDeadline = '';
  deadlineMsg: string = 'Deadline date already passed!';
  addFail: boolean = false;
  isDeletedFlag: boolean = false;
  isEditedFlag: boolean = false;
  display: string = 'none';
  private _search: string = '';
  notDeleted: boolean = false;
  isClicked: boolean = false;
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

  ngOnInit(): void {}

  confirm(task: ITask): void {
    // let matDialog = this.dialog.open(ConfirmComponent);
    // matDialog.afterClosed().subscribe((result) => {
    //   if (result.data === 'confirmed') {
    //     this.deleteTodo(task);
    //   }
    // });
    let dialog = this.dialogService.confirmDialog({
      title: 'Please confirm',
      message: 'Are you sure you want to do this?',
      confirmButton: 'Delete',
      cancelButton: 'Cancel',
    });

    dialog.subscribe((result) => {
      if(result) {
        this.deleteTodo(task);
      }
      
    })
  }

  //obriši task
  deleteTodo(task: ITask): void {
    if (task.done) {
      this.crudHttpService.deleteTodo(task.id).subscribe((data) => {
        const filteredIndex = this.filterArray.findIndex(
          (el) => el.id === task.id
        );

        if (filteredIndex > -1) {
          this.filterArray.splice(filteredIndex, 1);
          this.status = `Task: ${task.text.toUpperCase()} deleted!`;
        }
        const todoIndex = this.todo.findIndex((el) => el.id === task.id);

        if (todoIndex > -1) {
          this.todo.splice(todoIndex, 1);
          this.status = `Task: ${task.text.toUpperCase()} deleted!`;
        }

        this.isDeletedFlag = true;
        setTimeout(() => {
          this.isDeletedFlag = false;
        }, 3500);
      });
    } else {
      this.status = `Can't delete task that is not completed!`;
      this.notDeleted = true;
      setTimeout(() => {
        this.notDeleted = false;
      }, 3500);
    }
  }

  //izbriši sve taskove

  //update task
  showHideEdit(task: ITask): void {
    this.selectedTask = {
      id: task.id,
      text: task.text,
      date: task.date,
      done: task.done,
      deadline: task.deadline,
    };
    // console.log(this.selectedTask);
    this.isClicked = true;
    // console.log(this.isClicked);
  }

  updateTodo(task: ITask) {
    const currentDate = format(new Date(), 'dd.MM.yyyy');
    let _newDeadline = this.newDeadline.split('-');
    this.newDeadline = `${_newDeadline[2]}.${_newDeadline[1]}.${_newDeadline[0]}`;
    let arr = currentDate.split('.');
    if (_newDeadline[0] >= arr[2]) {
      console.log('unesena godina veca ili jednaka nego trenutna');

      if (Number(_newDeadline[1]) >= Number(arr[1])) {
        console.log('uneseni mjesec veci ili jednak nego trenutni');
        if (
          (Number(_newDeadline[2]) >= Number(arr[0]) &&
            Number(_newDeadline[1]) === Number(arr[1])) ||
          (Number(_newDeadline[2]) <= Number(arr[0]) &&
            Number(_newDeadline[1]) > Number(arr[1])) 
        ) {
          let newTask = {
            id: task.id,
            text: this.newText,
            date: task.date,
            done: task.done,
            deadline: this.newDeadline,
          };
          this.sub = this.crudHttpService
            .updateTask(task.id, newTask)
            .subscribe(
              () => {
                const filteredIndex = this.filterArray.findIndex(
                  (el) => el.id === this.selectedTask.id
                );

                if (filteredIndex > -1) {
                  this.filterArray.splice(filteredIndex, 1, newTask);
                  this.status = `Task: ${task.text.toUpperCase()} edited to ${newTask.text.toUpperCase()}`;
                  this.newText = '';
                  this.isEditedFlag = true;
                  this.isDeletedFlag = false;
                }
                const todoIndex = this.todo.findIndex(
                  (el) => el.id === this.selectedTask.id
                );

                if (todoIndex > -1) {
                  this.todo.splice(todoIndex, 1, newTask);
                  this.status = `Task: ${task.text.toUpperCase()} edited to ${newTask.text.toUpperCase()}`;
                  this.newText = '';
                  this.isEditedFlag = true;
                  setTimeout(() => {
                    this.isEditedFlag = false;
                  }, 3500);
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
        } else {
          this.status = this.deadlineMsg;
          this.addFail = true;
          setTimeout(() => {
            this.addFail = false;
          }, 3500);
        }
      } else {
        this.status = this.deadlineMsg;
        this.addFail = true;
        setTimeout(() => {
          this.addFail = false;
        }, 3500);
      }
    } else {
      this.status = this.deadlineMsg;
      this.addFail = true;
      setTimeout(() => {
        this.addFail = false;
      }, 3500);
    }
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

  checkDoneTask(task: ITask): void {
    let selectedTask = {
      id: task.id,
      text: task.text,
      date: task.date,
      done: task.done ? false : true,
      deadline: task.deadline,
    };
    if (task.done) {
      task.done = false;
    } else {
      task.done = true;
    }
    this.crudHttpService.updateTask(task.id, selectedTask).subscribe(
      () => {},
      (error) => {}
    );
  }

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
