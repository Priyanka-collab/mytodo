import { Injectable } from '@angular/core';
import { Todo } from '../todo/todo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor() {}

  getTodos() {
    this.todosSubject.next(this.todos);
  }

  addTodo(title: string) {
    const newTodo: Todo = { id: Date.now(), title, completed: false };
    this.todos.push(newTodo);
    this.getTodos();
  }

  updateTodo(updatedTodo: Todo) {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = { ...updatedTodo }; // Ensure immutability
      this.getTodos();
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.getTodos();
  }
}