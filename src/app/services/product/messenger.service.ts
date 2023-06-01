import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { HttpService } from "../base/http.service";
import { BaseService } from "../base/base.service";
@Injectable({
    providedIn: 'root'
  })
export class MessengerService extends BaseService{
    constructor(httpService:HttpService) {
      super(httpService); 
      this.controller = 'Messenger'
    }
}