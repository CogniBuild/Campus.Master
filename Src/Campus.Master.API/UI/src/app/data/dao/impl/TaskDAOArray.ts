import { Project } from '../../../model/Project';
import { Observable, of } from 'rxjs';
import { TaskDAO } from '../interface/TaskDAO';
import { Task } from 'src/app/model/task';
import { TestData } from '../../testData';
import { Priority } from '../../../model/priority';
import { Status } from '../../../model/status';

export class TaskDAOArray implements TaskDAO {
  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find((todo) => todo.id === id));
  }

  add(task: Task): Observable<Task> {
    if (task.id === null || task.id === 0) {
      task.id = this.getLastIdTask();
    }

    if (task.status === null) {
      task.status = this.getStatus();
    }

    TestData.tasks.push(task);

    return of(task);
  }

  getLastIdTask(): number {
    return (
      Math.max.apply(
        Math,
        TestData.tasks.map((task) => task.id)
      ) + 1
    );
  }

  getStatus(): Status {
    return { id: 1, title: 'Active', completed: false };
  }

  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find((t) => t.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);

    return of(taskTmp);
  }

  getCompletedCountInCategory(category: Project): Observable<number> {
    return of(this.searchTask(category, null, true, null).length);
  }

  getTotalCount(): Observable<number> {
    return of(TestData.tasks.length);
  }

  getTotalCountInCategory(category: Project): Observable<number> {
    return of(this.searchTask(category, null, null, null).length);
  }

  getUncompletedCountInCategory(category: Project): Observable<number> {
    return of(this.searchTask(category, null, false, null).length);
  }

  search(
    category: Project,
    searchText: string,
    status: boolean,
    priority: Priority
  ): Observable<Task[]> {
    return of(this.searchTask(category, searchText, status, priority));
  }

  searchTask(
    category: Project,
    searchText: string,
    status: boolean,
    priority: Priority
  ): Task[] {
    let allTasks = TestData.tasks;

    if (status != null) {
      allTasks = allTasks.filter((task) => task.status.completed === status);
    }
    // } else {
    //   allTasks = allTasks.filter(task => task.status);
    // }

    if (category != null) {
      allTasks = allTasks.filter((todo) => todo.category === category);
    }

    if (searchText != null) {
      allTasks = allTasks.filter(
        (task) => task.title.toUpperCase().includes(searchText.toUpperCase())
      );
    }
    return allTasks;
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find((t) => t.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);

    return of(task);
  }
}
