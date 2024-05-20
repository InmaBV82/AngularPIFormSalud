import { Injectable } from '@angular/core';
import { PlatoDTO } from '../modelos/PlatoDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private apiUrl: string;

  constructor(private http : HttpClient, private usuarioService: UsuariosService) {
    this.apiUrl = 'http://localhost:8080/';
  }

  //GET

  getTodoslosPlatos():Observable<PlatoDTO[]> {
    return this.http.get<PlatoDTO[]>(this.apiUrl+ 'platosDto');
  }
  
  getPlatosCategoria(categoriaid:number): Observable<PlatoDTO[]> {
    return this.http.get<PlatoDTO[]>(this.apiUrl+ 'platosCategoria/'+categoriaid);
  }

  getPlatoDTO(platoid:number): Observable<PlatoDTO> {
    return this.http.get<PlatoDTO>(this.apiUrl+ 'platoDTO/'+platoid);
  }

    //GET
    getPlatosUsuario(): Observable<PlatoDTO[]> {
      let userId = this.usuarioService.getUserId();
      return this.http.get<PlatoDTO[]>(this.apiUrl+ 'platosUsuario/'+userId);
    }

  //POST
  addPlatoUsuario(form: FormGroup) {
    let userId = this.usuarioService.getUserId();
    const platoAddData = form.value; // Guardo los valores del formulario para pasarselo a la llamada
    return this.http.post(this.apiUrl + 'addPlatoDTO/' + userId, platoAddData);

  }
}
