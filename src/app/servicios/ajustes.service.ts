import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AjustesService {
  private apiUrl: string;


  constructor(
    private http : HttpClient,
    private usuarioService: UsuariosService) {
    this.apiUrl = 'http://localhost:8080/';
  }

  //GET
  getUsuario(): Observable<Usuario> {
    let userId = this.usuarioService.getUserId();
    return this.http.get<Usuario>(this.apiUrl+ 'usuario/'+userId);
  }



}
