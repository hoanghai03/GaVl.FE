import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpOption, HttpService } from "../base/http.service";
import { BaseService } from "../base/base.service";
import { environment } from "src/environments/environment";
import { ChatMessage } from "src/app/pages/apps/chat/chat.model";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  private apiUrl = environment.api_url;
  _http!: HttpService;
  controller = "Messenger";
  _baseOptions!: HttpOption;

  constructor(public http: HttpService) {
    this._http = http;
  }

  postInfoMessenger(customUrl: string = "", entities: object) {
    const url = customUrl
      ? customUrl
      : `/${this.controller}/InfoMessenger`;
    return this.http.post<ChatMessage[]>(url, entities);
  }

  getAll(customUrl: string = "") {
    const url = customUrl
      ? customUrl
      : `${this.controller}/GetAll`;
    return this.http.get(url);
  }

  postInsertMessenger(customUrl: string = "", entities: object) {
    const url = customUrl
      ? customUrl
      : `/${this.controller}/InsertMessenger`;
    return this.http.post(url, entities);
  }
}
