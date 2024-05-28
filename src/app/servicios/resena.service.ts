import { Injectable } from '@angular/core';
import { ResenaDTO } from '../modelos/ResenaDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { ResenaAddDTO } from '../modelos/ResenaAddDTO';
import { FormGroup } from '@angular/forms';

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
  getResenas(): Observable<ResenaDTO[]> {
    return this.http.get<ResenaDTO[]>(this.apiUrl+ 'resenasDto');
  }

  getResenasPlato(platoid:number): Observable<ResenaDTO[]> {
    return this.http.get<ResenaDTO[]>(this.apiUrl+ 'resenasPlato/'+platoid);
  }

  //GET
  getResenasUsuario(): Observable<ResenaDTO[]> {
    let userId = this.usuarioService.getUserId();
    return this.http.get<ResenaDTO[]>(this.apiUrl+ 'resenasUsuario/'+userId);
  }

  //una resenaAddDTO
  getUnaResenaAddDTO(id:number): Observable<ResenaAddDTO> {
    return this.http.get<ResenaAddDTO>(this.apiUrl+ 'resenaAddDTO/'+id);
  }


 //POST
addResenaUsuario(resenaAddData: ResenaAddDTO): Observable<ResenaAddDTO> {
  let userId = this.usuarioService.getUserId();
  return this.http.post<ResenaAddDTO>(this.apiUrl+ 'resenaAddDto/' +userId, resenaAddData);
}

 //DELETE
deleteResena(id:number): Observable<ResenaDTO> {
  return this.http.delete<ResenaDTO>(this.apiUrl+ 'resenaDelete/'+id);

}

//UPDATE
editResena(id:number,form: FormGroup, ) {
  let userId = this.usuarioService.getUserId();
  const resenaAddUpdate = form.value; // Guardo los valores del formulario para pasarselo a la llamada
  resenaAddUpdate.autorId=userId
  return this.http.put(this.apiUrl + 'editResenaAddDto/' + id, resenaAddUpdate);
} 

}
