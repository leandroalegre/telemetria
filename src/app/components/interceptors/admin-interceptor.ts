import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('users') || req.url.includes('personas') || req.url.includes('panelcontrol')){

      const userValue = this.authSvc.userTokenValue$;
      const authReq = req.clone({
        setHeaders: {
          auth: userValue,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
