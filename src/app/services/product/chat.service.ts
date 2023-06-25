import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpOption, HttpService } from "../base/http.service";
import { BaseService } from "../base/base.service";
import { environment } from "src/environments/environment";
import { ChatMessage } from "src/app/pages/apps/chat/chat.model";
@Injectable({
  providedIn: 'root'
})
export class ChatService{
  private apiUrl = environment.api_url;
  _http!: HttpService;
  controller = "Messenger";
  _baseOptions!: HttpOption;
  
  
  constructor(public http: HttpService) {
    this._http = http;
  }
  
  postInfoMessenger(customUrl: string = "",entities: object) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = customUrl ? customUrl : `${this.apiUrl}/${this.controller}/InfoMessenger`;
    return this.http.post<ChatMessage[]>(url,entities,{headers});
  }

  getAll(customUrl: string = "") {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = customUrl ? customUrl : `${this.apiUrl}/${this.controller}/GetAll`;
    return this.http.get(url,{headers});
  }

  postInsertMessenger(customUrl: string = "",entities: object) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = customUrl ? customUrl : `${this.apiUrl}/${this.controller}/InsertMessenger`;
    return this.http.post(url,entities,{headers});
  }

}