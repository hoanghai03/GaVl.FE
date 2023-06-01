import { HttpClient, HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

type NewType = HttpOption;

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(public http: HttpClient) {

    }

    public get<T>(url: string, options?: NewType): Observable<T> {
        if (options != null) {
            return this.http.request<T>('GET', url, options);
        }
        return this.http.get<T>(url);
    }

    /**
     * Method POST
     * @param url
     * @param body
     * @returns
     */
    public post<T>(url: string, body: any, options?: HttpOption): Observable<T> {
        if (options != null) {
            return this.http.request<T>('POST', url, Object.assign(options, { body: body }));
        }
        return this.http.post<T>(url, body);
    }
}


export class HttpOption {
    public headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    // public observe!: 'events';
    public context?: HttpContext;
    public params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    public reportProgress?: boolean;
    public responseType?: 'json';
    public withCredentials?: boolean;
}