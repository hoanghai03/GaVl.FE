import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('assets')) {
      const authToken = localStorage.getItem('token');
      if (authToken) {
        request = request.clone({
          url: environment.api_url + request.url,
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
      } else {
        request = request.clone({
          url: environment.api_url + request.url
        });
      }
    }
    return next.handle(request);
  }
}
