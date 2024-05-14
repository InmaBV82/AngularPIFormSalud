import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../modelos/Usuario';
import { HistoricoDTO } from '../modelos/HistoricoDTO';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private apiUrl: string;


  constructor(
    private http : HttpClient,
    private usuarioService: UsuariosService) {
    this.apiUrl = 'http://localhost:8080/';
  }

  //GET
  getHistoricoUsuario(): Observable<HistoricoDTO[]> {
    let userId = this.usuarioService.getUserId();
    return this.http.get<HistoricoDTO[]>(this.apiUrl+ 'historicosUsuario/'+userId);
  }



}
