import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminGuard implements CanActivate {
  constructor(private authSvc:AuthService, private router:Router){}
  canActivate():Observable<boolean> {

    return this.authSvc.IsAdmin$.pipe(
      take(1),
      map((isAdmin) => {
        if (isAdmin=='admin') {
          return true;
        } else {
          this.authSvc.logout();
        }
      })

    );


  }

}
