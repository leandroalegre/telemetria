import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckVistasGuard implements CanActivate {
  constructor(private authSvc:AuthService, private router:Router){}
  canActivate():Observable<boolean> {

    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged: boolean) => {
        if (isLogged) {
          return true;
        } else {
          this.router.navigate(['login']);
        }
      })

    );


  }

}
