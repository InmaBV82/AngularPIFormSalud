import { Injectable } from '@angular/core';
import { ResenaDTO } from '../modelos/ResenaDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private apiUrl: string;

  constructor(private htp : HttpClient) {
    this.apiUrl = 'http://localhost:8080/';
  }

  getResenasPlato(platoid:number): Observable<ResenaDTO[]> {
    return this.htp.get<ResenaDTO[]>(this.apiUrl+ 'resenasPlato/'+platoid);
  }
}
