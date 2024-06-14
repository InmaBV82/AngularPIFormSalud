import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipo } from '../modelos/Tipo';


@Injectable({
  providedIn: 'root'
})
export class TiposService {
  private apiUrl: string;
  
  constructor(private http : HttpClient){
  this.apiUrl = 'http://localhost:8099/';
   }

//GET
  obtenerTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.apiUrl+ 'tipos');
  }

  obtenerUno(id:number): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.apiUrl+ 'tipo/'+id);
  }

  



}
