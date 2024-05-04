import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../modelos/Categoria';


@Injectable({
  providedIn: 'root'
})
export class ListadoCategoriaService {
  private apiUrl: string;

  constructor(private htp : HttpClient) {
    this.apiUrl = 'http://localhost:8080/';
  }



  obtenerCategorias(): Observable<Categoria[]> {
    return this.htp.get<Categoria[]>(this.apiUrl+ 'categorias');
  }
}
