import { FormBuilder } from '@angular/forms';
import { LocalService } from './../../../services/local.service';
import {  Subject } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = null;
  isLogged=false;
  nombre_completo= null;
  nombre= null;
  role= null;

  mensaje;
  ruta;
@Output() toggleSidenav = new EventEmitter<void>();
private destroy$ = new Subject<any>();

  constructor(private authSvc:AuthService, private localService:LocalService, private PerSvc: PersonasService) { }
  user = this.localService.getJsonValue('user');

  ngOnInit(): void {
    this.PerSvc.getPersonaYRol(this.user.userId).subscribe(
      res=> {
        this.nombre_completo=res[0].nombre_completo
      })

this.role=this.user.role.toUpperCase();
this.authSvc.isLogged.pipe(takeUntil(this.destroy$))

.subscribe(res=>this.isLogged = res);

    this.authSvc.IsAdmin$.pipe(
      takeUntil(this.destroy$))
     .subscribe(res=>(this.isAdmin=res));
  }

  ngOnDestroy(): void {
   this.destroy$.next({});
   this.destroy$.complete();
  }

  onLogout():void{
    this.authSvc.logout();
  }
}
