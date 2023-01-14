import { LocalService } from './../../services/local.service';
import { Router } from '@angular/router';
import { UserResponse, User, Roles, nwpass } from './../../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

private loggedId= new BehaviorSubject<boolean>(false);
private role= new BehaviorSubject<Roles>(null);
private subrol = new BehaviorSubject<number>(null)
private userToken = new BehaviorSubject<string>(null);

  constructor(private http:HttpClient, private router: Router, private localService: LocalService) {
    this.checkToken();
     }

     get isLogged():Observable<boolean>{
       return this.loggedId.asObservable();
     }

     get IsAdmin$():Observable<any>{
       return this.role.asObservable();
     }

     get subRol():Observable<any>{
      return this.subrol.asObservable();
    }

     get userTokenValue$():string{
      return this.userToken.getValue();
    }

  login(authData:User):Observable<any>{
    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
        map((user:UserResponse)=>{
          if(user.message=="sin rol"){
            Swal.fire(
              'Cancelado',
              'El usuario no puede ingresar porque no posee rol.',
              'error'
            )
          }else if(user.message==='blanco'){
            Swal.fire({
              title: 'Primer ingreso al sistema',
              text: 'Debe proporcionar una clave de acceso por unica vez',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si, establecer contraseña',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.value) {
                this.localService.setJsonValue('user', user);
                this.router.navigate(['login/nwpass'])
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                  'Cancelado',
                  'Debe proporcionar una clave para ingresar.',
                  'error'
                )
              }
            })
          }else if(user.message==='incorrecto'){
            Swal.fire(
              'Error!',
              'Usuario o contraseña incorrecta.',
              'error'
            )
          }else if(user.message==='deshabilitado'){
            Swal.fire(
              'Error!',
              'Comuníquese con RRHH.',
              'error'
            )
          }else{
            this.localService.setJsonValue('user', user);
          this.loggedId.next(true);
          this.role.next(user.role);
          this.subrol.next(user.subrol)
          this.userToken.next(user.token)
          return user;
        }
}),
catchError((err)=>this.handlerError(err))
    );
  }

  changePassword(userPass:nwpass){
    return this.http.patch<nwpass>(`${environment.API_URL}/auth/new-password`, userPass)

  }

  logout():void{
    this.localService.clearToken();
    this.loggedId.next(false);
    this.role.next(null);
    this.subrol.next(null)
    this.userToken.next(null);
    this.router.navigate(['/login']);
  }
  private checkToken():void{
    const user = this.localService.getJsonValue('user') || null;
    if(user){
      const isExpired = helper.isTokenExpired(user.token);

      if(isExpired){
        this.logout();
      }else{
        this.loggedId.next(true);
        this.role.next(user.role);
        this.subrol.next(user.subrol)
        this.userToken.next(user.token)
      }
    }


  }
  private saveLocalStorage(user:UserResponse):void{
    // localStorage.setItem('token', token);
    const{userId, message, ...rest} = user;
    localStorage.setItem('user', JSON.stringify(rest))
  }
  private handlerError(err):Observable<never>{
    let errorMessage = "Ocurrio un error";
    if(err.error.message==='incorrecto'){
      Swal.fire('Ocurrio un error...', 'Usuario o contraseña incorrectos.', 'error')
    }else if(err.error.message==='deshabilitado'){
    Swal.fire('Ocurrio un error...', 'Usuario deshabilitado.', 'error')

    }else{
      Swal.fire('Ocurrio un error...', 'Debe proporcionar una clave para ingresar.', 'error')
    }
    return throwError(errorMessage);
  }
}
