import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOperadorGuard implements CanActivate {
  constructor(private authSvc:AuthService, private router:Router){}
  canActivate():Observable<boolean> {

    return this.authSvc.IsAdmin$.pipe(
      take(1),
      map((isAdmin) => {
        if (isAdmin=='admin' || isAdmin=='operador') {
          return true;
        } else {
          this.authSvc.logout();
        }
      })

    );


  }

}
