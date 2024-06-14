import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { FormGroup } from '@angular/forms';
import { HistoricoDTO } from '../modelos/HistoricoDTO';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private apiUrl: string;


  constructor(
    private http : HttpClient,
    private usuarioService: UsuariosService) {
    this.apiUrl = 'http://localhost:8099/';
  }

  //GET
  getHistoricoUsuario(): Observable<HistoricoDTO[]> {
    let userId = this.usuarioService.getUserId();
    return this.http.get<HistoricoDTO[]>(this.apiUrl+ 'historicosUsuario/'+userId);
  }

  //GET/id
  getUnHistorico(idHistorico:number): Observable<HistoricoDTO> {
    return this.http.get<HistoricoDTO>(this.apiUrl+ 'historicoDTO/'+idHistorico);
  }


  //POST
  addHistoricoUsuario(form: FormGroup) {
    const userId = this.usuarioService.getUserId();
    const historicoData = form.value; // Guardo los valores del formulario para pasarselo a la llamada
    return this.http.post(this.apiUrl + 'addHistoricoDTO/' + userId, historicoData);
  }

  //DELETE
  deleteHistorico(idHistorico:number): Observable<HistoricoDTO> {
    return this.http.delete<HistoricoDTO>(this.apiUrl+ 'historicoDelete/'+idHistorico);

  }

  //UPDATE
  editHistoricoUsuario(id:number,form: FormGroup, ) {
    let userId = this.usuarioService.getUserId();
    const historicoUpdate = form.value; // Guardo los valores del formulario para pasarselo a la llamada
    historicoUpdate.usuarioid=userId
    return this.http.put(this.apiUrl + 'editHistoricoDTO/' + id, historicoUpdate);
  }




}
