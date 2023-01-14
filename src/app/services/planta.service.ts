import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {

  constructor(private http:HttpClient) { }

  getLecturas(): Observable<any> {
    return this.http.get(`${environment.API_URL}/planta/getLecturas`);
  }
}
