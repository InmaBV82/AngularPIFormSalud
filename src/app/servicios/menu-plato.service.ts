import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuPlatoDTO } from '../modelos/MenuPlatoDTO';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

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


  //POST
  crearMenuPlato(menuPlatoForm: FormGroup): Observable<any> {
    const menuPlatoData = {
      id: {
        platoid: menuPlatoForm.value.platoid,
        idmenu: menuPlatoForm.value.idMenu,
        momentodia: menuPlatoForm.value.momento
      }
    };
    return this.http.post<any>(this.apiUrl+'menuPlatoNuevo', menuPlatoData);
  }


}
