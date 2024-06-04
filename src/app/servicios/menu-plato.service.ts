import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuPlatoDTO } from '../modelos/MenuPlatoDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuPlatoService {
  private apiUrl: string;


  constructor(
    private http : HttpClient
  ) {
    this.apiUrl = 'http://localhost:8080/';
  }

  //GET
  obtenerMenuPlatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl+ "menuPlatosDTO");
  }

  //filtro reseñas por puntuacion
  getFiltroMenuPlatoPorTipo(tipo:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+ 'filtroMenuPlato/'+tipo);
  }
}
