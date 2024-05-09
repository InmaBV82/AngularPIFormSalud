import { Injectable } from '@angular/core';
import { PlatoDTO } from '../modelos/PlatoDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private apiUrl: string;

  constructor(private http : HttpClient) {
    this.apiUrl = 'http://localhost:8080/';
  }

  getPlatosCategoria(categoriaid:number): Observable<PlatoDTO[]> {
    return this.http.get<PlatoDTO[]>(this.apiUrl+ 'platosCategoria/'+categoriaid);
  }


}
