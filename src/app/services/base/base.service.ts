import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceResult } from "src/app/models/base/service-result";
import { environment } from "src/environments/environment";
import { HttpOption, HttpService } from "./http.service";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    private apiUrl = environment.api_url;
    controller = "";
    _baseOptions !: HttpOption;
    constructor(public http: HttpService) {

    }

    getAll(customUrl = ""): Observable<ServiceResult> {
        const url = customUrl ? customUrl : `${this.apiUrl}/${this.controller}/all`
        return this.http.get<ServiceResult>(url,this._baseOptions);
    } 
}