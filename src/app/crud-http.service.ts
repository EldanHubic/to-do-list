import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ITask } from './tasks/itask';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudHttpService {
  constructor(private http: HttpClient) {}
  apiUrl: string = 'http://localhost:3000/tasks';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //get all tasks from server
  getTasks(): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(this.apiUrl)
      .pipe(tap((data) => console.log(JSON.stringify(data))));
  }



  //add a new task
 addTodo(todo: ITask): Observable<ITask> {
   return this.http.post<ITask>(this.apiUrl, JSON.stringify(todo), {headers: this.headers}).pipe(
     catchError(this.errorHandler)
   );
 }



  //delete task
  deleteTodo(id: number): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorHandler) 
    )
  }



  //update task
  updateTask(id: any, data: ITask): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    )
  }

  

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}

