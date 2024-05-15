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
  getMenuPlato(): Observable<MenuPlatoDTO[]> {
    return this.http.get<MenuPlatoDTO[]>(this.apiUrl+ "menuPlatosDTO");
  }
}
