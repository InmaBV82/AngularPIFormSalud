import { Injectable } from '@angular/core';
import { ResenaDTO } from '../modelos/ResenaDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private apiUrl: string;


  constructor(
    private http : HttpClient,
    private usuarioService: UsuariosService) {
    this.apiUrl = 'http://localhost:8080/';
  }

  //GET
  getResenasPlato(platoid:number): Observable<ResenaDTO[]> {
    return this.http.get<ResenaDTO[]>(this.apiUrl+ 'resenasPlato/'+platoid);
  }

  //GET
  getResenasUsuario(): Observable<ResenaDTO[]> {
    let userId = this.usuarioService.getUserId();
    return this.http.get<ResenaDTO[]>(this.apiUrl+ 'resenasUsuario/'+userId);
  }


  //POST
  addResena(resena: any) {
    return this.http.post(this.apiUrl, resena);
  }
}
