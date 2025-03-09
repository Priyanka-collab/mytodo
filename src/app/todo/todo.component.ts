import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoService } from '../services/todo.service';
import { Todo } from './todo.model'

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  todos: Todo[] = [];
  newTodoTitle = '';
  editingTodo: Todo | null = null;
  editTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todos$.subscribe((todos) => (this.todos = todos));
    this.todoService.getTodos();
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }

  toggleCompletion(todo: Todo) {
    // Update the completion status
    todo.completed = !todo.completed;
  
    // If task is completed, disable editing
    if (todo.completed) {
      this.editingTodo = null; // Prevents editing a completed task
    }
  
    // Update the service (or local storage if needed)
    this.todoService.updateTodo(todo);
  }
  

  // toggleCompletion(todo: Todo) {
    // this.todoService.updateTodo({ ...todo, completed: !todo.completed });
  // }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  editTodo(todo: Todo) {
    this.editingTodo = { ...todo }; // Clone to prevent direct mutation
    this.editTitle = this.editingTodo.title;
  }

  saveTodo() {
    if (this.editingTodo) {
      this.todoService.updateTodo({ ...this.editingTodo, title: this.editTitle });
      this.editingTodo = null;
    }
  }
  
}
