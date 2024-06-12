import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MenuDTO } from '../modelos/MenuDTO';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl: string;


  constructor(
    private http : HttpClient
  ) {
    this.apiUrl = 'http://localhost:8080/';
  }

  //GET
  obtenerMenus(): Observable<MenuDTO[]> {
    return this.http.get<MenuDTO[]>(this.apiUrl+ "menusDto");
  }

  //POST
crearMenu(form: FormGroup): Observable<any>{
  return this.http.post<any>(this.apiUrl+ "menuNuevo", form.value);

}

 //DELETE
deleteMenu(idMenu:number): Observable<any> {
  return this.http.delete<any>(this.apiUrl+ 'menuDelete/'+idMenu);

}


}
