import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http:HttpClient) { }

  findPersonbyDNI(ingresarVoto):Observable<any>{
    return this.http.get(`${environment.API_URL}/personas/findPersonbyDNI/${ingresarVoto.dni}`)
  }

  verificarVoto(id_persona):Observable<any>{
    return this.http.get(`${environment.API_URL}/personas/verificarVoto/${id_persona}`)
  }

  confirmarVoto(id_persona, userId):Observable<any>{
    return this.http.get(`${environment.API_URL}/personas/confirmarVoto/${id_persona}/${userId}`)
  }

  getPersonaYRol(id_persona:number): Observable<any> {
    return this.http.get(`${environment.API_URL}/personas/getPersonaYRol/${id_persona}`,);
  }

  getVotoPadron():Observable<any>{
    return this.http.get(`${environment.API_URL}/personas/getVotoPadron`)
  }

  getReferentes(): Observable<any> {
    return this.http.get(`${environment.API_URL}/personas/getReferentes`);
  }
  getReferenteUser(id_persona): Observable<any> {
    return this.http.get(`${environment.API_URL}/personas/getReferenteUser/${id_persona}`);
  }

  getVotosByReferentes(id_persona): Observable<any> {
    return this.http.get(`${environment.API_URL}/personas/getVotosByReferentes/${id_persona}`);
  }

  getPersonasbyReferente(id_persona):Observable<any>{
    return this.http.get(`${environment.API_URL}/personas/getPersonasByReferente/${id_persona}`)
  }

  getTotalVotos():Observable<any>{
    return this.http.get(`${environment.API_URL}/personas/getTotalVotos`)
  }

  getTotalVotosOposicion():Observable<any>{
    return this.http.get(`${environment.API_URL}/personas/getTotalVotosOposicion`)
  }

  getTotalVotosReferentes():Observable<any>{
    return this.http.get(`${environment.API_URL}/personas/getTotalVotosReferentes`)
  }




}
