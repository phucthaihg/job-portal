import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('TOKEN');

    if (!token) {
      return next.handle(request);
    } else {
      const headers = new HttpHeaders({
        'Authorization': token
      });

      const clone = request.clone({ headers });
      return next.handle(clone);
    }
  }
}
