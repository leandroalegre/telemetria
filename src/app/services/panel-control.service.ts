import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Users } from '../models/Users';
import { Relacion_referente } from '../models/RelacionReferente';

@Injectable({
  providedIn: 'root'
})
export class PanelControlService {

  constructor(private http: HttpClient  ) { }

  getAllvotantes(): Observable<any> {
    return this.http.get(`${environment.API_URL}/panelcontrol/getallpersonas`);
  }

  getAllreferentes(): Observable<any> {
    return this.http.get(`${environment.API_URL}/panelcontrol/getallreferentes`);
  }

  getRolebypersona(id: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/panelcontrol/getrolebyidpersona/${id}`);
  }

  nuevoReferente(id: number): Observable<any> {
    return this.http.get(`${environment.API_URL}/panelcontrol/nuevoreferente/${id}`);
  }

  quitarReferente(id: number, user: Users): Observable<any> {
    return this.http.patch(`${environment.API_URL}/panelcontrol/quitarreferente/${id}`, user);
  }

  referenciarPersona(rel: Relacion_referente, dump: number): Observable<any> {
    return this.http.patch(`${environment.API_URL}/panelcontrol/referenciarpersona/${dump}`, rel);
  }

  nuevoFiscal(fiscal, id: number): Observable<any> {
    return this.http.patch(`${environment.API_URL}/panelcontrol/nuevofiscal/${id}`, fiscal);
  }

  nuevaOposicion(opo, id: number): Observable<any> {
    return this.http.patch(`${environment.API_URL}/panelcontrol/nuevaoposicion/${id}`, opo);
  }
}
