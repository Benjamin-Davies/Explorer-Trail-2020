import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { LocalStorageTypes } from '../constants/local-storage-types';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private config: ConfigService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(LocalStorageTypes.Token);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      url: (this.config.get('API_ENDPOINT') as string) + request.url,
    });
    return next.handle(request);
  }
}
