import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosKey = 'angular_todos';
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  addTodo(title: string): void {
    const currentTodos = this.todosSubject.value;
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    const updatedTodos = [...currentTodos, newTodo];
    this.todosSubject.next(updatedTodos);
    this.saveToLocalStorage(updatedTodos);
  }

  updateTodo(id: number, changes: Partial<Todo>): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, ...changes } : todo
    );
    this.todosSubject.next(updatedTodos);
    this.saveToLocalStorage(updatedTodos);
  }

  toggleTodo(id: number): void {
    const currentTodos = this.todosSubject.value;
    const todoToToggle = currentTodos.find(t => t.id === id);
    if (todoToToggle) {
      this.updateTodo(id, { completed: !todoToToggle.completed });
    }
  }

  deleteTodo(id: number): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.todosSubject.next(updatedTodos);
    this.saveToLocalStorage(updatedTodos);
  }

  private saveToLocalStorage(todos: Todo[]): void {
    try {
      localStorage.setItem(this.todosKey, JSON.stringify(todos));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }
  }

  private loadFromLocalStorage(): void {
    try {
      const storedTodos = localStorage.getItem(this.todosKey);
      if (storedTodos) {
        this.todosSubject.next(JSON.parse(storedTodos));
      }
    } catch (e) {
      console.error('Error loading from local storage', e);
      this.todosSubject.next([]);
    }
  }
}
