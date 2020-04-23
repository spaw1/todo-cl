import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TodoService} from './todo.service';

@Component({
  selector: 'app-todotracker',
  templateUrl: './todotracker.component.html',
  styleUrls: ['./todotracker.component.scss']
})
export class TodotrackerComponent implements OnInit {
  toDoList: ToDoItem[] = [];
  activeToDoList: ToDoItem[] = [];
  completedToDoList: ToDoItem[] = [];
  apiSubscription: Subscription;

  displayAdd = false;
  newItemDesc: any;

  constructor(protected todoService: TodoService) {
  }

  ngOnInit() {
    this.populateToDoList();
  }

  private populateToDoList() {
    this.apiSubscription = this.todoService.getTodoList().subscribe(toDoList => {
      this.toDoList = toDoList;
      if (toDoList && toDoList.length > 0) {
        this.updateStatusBasedLists();
        this.apiSubscription.unsubscribe();
      }
    });
  }

  private updateStatusBasedLists() {
    this.populateActiveToDoList();
    this.populateCompletedToDoList();
  }

  populateActiveToDoList() {
    this.activeToDoList = [];
    for (const each of this.toDoList) {
      if (each.status === ToDoStatus.ACTIVE) {
        this.activeToDoList.push(each);
      }
    }
  }

  populateCompletedToDoList() {
    this.completedToDoList = [];
    for (const each of this.toDoList) {
      if (each.status === ToDoStatus.COMPLETE) {
        this.completedToDoList.push(each);
      }
    }
  }

  deleteItem(id: number) {
    this.updateItem(id, ToDoStatus.DELETED);
  }

  markItemAsComplete(id: number) {
    this.updateItem(id, ToDoStatus.COMPLETE);
  }

  private updateItem(id: number, toDoStatus: ToDoStatus) {
    this.apiSubscription = this.todoService.updateTodo(new ToDoItem(id, this.newItemDesc, toDoStatus)).subscribe(response => {
      this.apiSubscription.unsubscribe();
      this.populateToDoList();
    });
  }

  addNewItem() {
    this.apiSubscription = this.todoService.createTodo(new ToDoItem(null, this.newItemDesc, ToDoStatus.ACTIVE)).subscribe(response => {
      this.apiSubscription.unsubscribe();
      this.populateToDoList();
    });
    this.newItemDesc = null;
    this.displayAdd = false;
  }
}

enum ToDoStatus {
  ACTIVE = 'active',
  COMPLETE = 'complete',
  DELETED = 'deleted'
}

export class ToDoItem {
  id: number;
  desc: string;
  status: ToDoStatus;

  constructor(id: number, desc: string, status: ToDoStatus) {
    this.id = id;
    this.desc = desc;
    this.status = status;
  }
}
