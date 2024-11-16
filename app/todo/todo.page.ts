import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service'; // Corrigir caminho do serviço

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  tasks: any[] = [];
  newTask: string = '';
  editingTask: any = null;

  constructor(private todoService: TodoService) {} // Injeção correta do serviço

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.todoService.getTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  addTask() {
    const task = { name: this.newTask };
    this.todoService.addTask(task).subscribe(() => {
      this.getTasks();
      this.newTask = '';
    });
  }

  editTask(task: any) {
    this.editingTask = { ...task };
  }

  updateTask() {
    this.todoService.updateTask(this.editingTask.id, this.editingTask).subscribe(() => {
      this.getTasks();
      this.editingTask = null;
    });
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.getTasks();
    });
  }
}