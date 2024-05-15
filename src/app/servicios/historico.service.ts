import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { HistoricoDTO } from '../modelos/HistoricoDTO';
import { FormGroup } from '@angular/forms';

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

  //POST
  addHistoricoUsuario(form: FormGroup) {
    const userId = this.usuarioService.getUserId();
    const historicoData = form.value; // Guardo los valores del formulario para pasarselo a la llamada
    return this.http.post(this.apiUrl + 'addHistoricoDTO/' + userId, historicoData);
  }




}
