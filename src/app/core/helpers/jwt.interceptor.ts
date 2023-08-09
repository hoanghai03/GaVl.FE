import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');
    if (!request.url.includes('HubSignalR') && !request.url.includes('Auth/signin')) {
      if (authToken) {
        request = request.clone({
          url: environment.api_url + request.url,
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
      } else {
        this.authenticationService.logout();
        this.router.navigate(['/auth/login']);
        return new Observable<any>(() => {});
      }
  }
    return next.handle(request);
  }
}
