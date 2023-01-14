import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado, User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient
    ) { }

    getAll(): Observable<User[]> {
      return this.http
        .get<User[]>(`${environment.API_URL}/users`)
        .pipe(catchError(this.handlerError));
    }

    getById(userId: number): Observable<User> {
      return this.http
        .get<any>(`${environment.API_URL}/users/${userId}`)
        .pipe(catchError(this.handlerError));
    }

    getUsers():Observable<any>{
      return this.http.get(`${environment.API_URL}/users/getUsers`)
    }

    buscarExistente(username):Observable<any>{
      return this.http.get(`${environment.API_URL}/users/buscarExistente/${username}`)
    }

    buscarExistenteLegajo(legajo):Observable<any>{
      return this.http.get(`${environment.API_URL}/users/buscarExistenteLegajo/${legajo}`)
    }

    new(user): Observable<any> {
      return this.http.post(`${environment.API_URL}/users`, user)
    }

    update(userId: number, user: User): Observable<User> {
      return this.http
        .patch<User>(`${environment.API_URL}/users/${userId}`, user)
        .pipe(catchError(this.handlerError));
    }

    cambiaEstado(userId:number, estado:Estado): Observable<User>{
    return this.http
    .patch<User>(`${environment.API_URL}/users/editE/${userId}`, estado)
    .pipe(catchError(this.handlerError));
}

blanquear(id, password):Observable<any>{
  return this.http.patch(`${environment.API_URL}/users/blanquear/${id}`, password)
}

    delete(userId: number): Observable<{}> {
      return this.http
        .delete<User>(`${environment.API_URL}/users/${userId}`)
        .pipe(catchError(this.handlerError));
    }

    handlerError(error): Observable<never> {
      let errorMessage = 'Error unknown';
      if (error) {
        errorMessage = error.error.message;
      }
      return throwError(errorMessage);
    }
  }
