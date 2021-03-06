import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/Rx'
import { Observable } from 'rxjs'
import { Task } from '../Models/task'

@Injectable()
export class TaskServiceService {
  constructor(private _http: Http) {

  }
  addUrl: string = "http://localhost/TaskManagerService/api/Task/AddTask";
  updateUrl: string = "http://localhost/TaskManagerService/api/Task/UpdateTask";
  getUrl: string = "http://localhost/TaskManagerService/api/Task/GetTasks";
  getParentTaskUrl: string = "http://localhost/TaskManagerService/api/Task/GetParentTasks";
  endTaskUrl: string = "http://localhost/TaskManagerService/api/Task/EndTask";
  sharedTaskID: number;

  changesharedTaskID(newTaskId: number) {
    this.sharedTaskID = newTaskId;
  }

  getsharedTaskID() {
    return this.sharedTaskID;
  }

  GetTask(): Observable<Task[]> {
    return this._http.get(this.getUrl)
      .map(response => { return response.json() })
      .catch(error => Observable.throw(error))
  }

  GetParentTasks(taskId): Observable<string[]> {
    return this._http.get(this.getParentTaskUrl + '/' + taskId)
      .map(response => { return response.json() })
      .catch(error => Observable.throw(error))
  }

  GetTaskById(taskId): Observable<Task> {
    return this._http.get(this.getUrl + '/' + taskId)
      .map(response => { return response.json() })
      .catch(error => Observable.throw(error))
  }

  AddTask(task) {
    let body = JSON.stringify(task);
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.addUrl, task, options)
      .catch(error => Observable.throw(error));
  }

  UpdateTask(task) {
    let body = JSON.stringify(task);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.updateUrl, body, options)
      .catch(error => Observable.throw(error));
  }

  EndTask(taskId) {
    let body = JSON.stringify(taskId);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.endTaskUrl, body, options)
      .map(response => { return response.json() })
      .catch(error => Observable.throw(error));
  }
}
