import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ToDoItem} from './todotracker.component';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  getTodoList(): Observable<any> {
    return this.httpClient.get(environment.gateway);
  }

  createTodo(todo: ToDoItem): Observable<any> {
    return this.httpClient.post(environment.gateway + '/create', todo);
  }

  updateTodo(todo: ToDoItem): Observable<any>{
    return this.httpClient.patch(environment.gateway + '/' + todo.id + '/updateStatus', todo);
  }
}
