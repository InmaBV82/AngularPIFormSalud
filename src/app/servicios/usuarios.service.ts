import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: Usuario[] = [];

  usuarioLogueado!: Usuario | undefined | null;

  private apiUrl: string;
  
  constructor(
    private http : HttpClient,
    private router : Router,

  ){
  this.apiUrl = 'http://localhost:8080/';
  //this.cargarUsuarios();
  
  }
  

   //GET
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl+ 'usuarios');
  }

  // Método para cargar usuarios
 /* cargarUsuarios() {
  this.getUsuarios().subscribe({
    next: (data) => {
      this.usuarios = data;
      this.usuarioLogueado = this.usuarios.find(usu => usu.id === this.getUserId());
      
    },
    error: (err) => console.error('Error al cargar usuarios', err)
  });
}*/

  //cargar un usuario por Id
  getAjustesUsuario(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl+ 'usuario/' + userId);
  }

  
  //POST
  addUsuario(form:FormGroup){
      
      const usuarioData = {
        ...form.value,//...el operador de propagación es usado para crear una copia de las propiedades de un objeto en otro objeto
        rol: 'usuario'  // Establece un valor predeterminado para el rol
      };
    return this.http.post(this.apiUrl+ 'usuarioNuevo', usuarioData);
  }

  //LOGIN
  loginUsuario(data : any): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl+ 'login', data);
  }


  //DELETE
  deleteUsuarioById(usuarioId:number): Observable<Usuario> {
      return this.http.delete<Usuario>(this.apiUrl+ 'usuario/'+usuarioId);
    }



  
//Autenticacion login
 /* login(email: string, password: string) {
    let existe: boolean =false
    for (let usu of this.usuarios) {
      if (usu.email == email && usu.password == password) {
        this.usuarioLogueado = usu
        this.saveUserId(usu.id); 
        this.router.navigateByUrl('/perfil');
        existe=true
        break;

      }
    }
    if(!existe){
      this.alertaPersonalizadaError("Error","Email no registrado","Error" )
      //alert("Email no registrado")
    }
    return this.usuarioLogueado
  }*/

  //GUARDAR USUARIO conviertiendo el id en string para guardarlo en el sessionstorage
  saveUserId(userId: number) {
    sessionStorage.setItem('userId', userId.toString());
  }

  getUserId(): number {
    const id = sessionStorage.getItem('userId');
    const parsedId = id ? parseInt(id, 10) : 0;
  //  console.log(this.getUserId)
    return Number.isNaN(parsedId) ? 0 : parsedId;
  }
  


  logout() {
    this.usuarioLogueado = null;
    sessionStorage.removeItem('userId'); // Borra el userId de la sessionStorage
    this.router.navigateByUrl("/login");
  }

 /*  getUsuarioLogueado() {
    return this.usuarioLogueado
  } */

  alertaPersonalizadaError(title:string, text:string, confirmButtonText:string){
    Swal.fire({
      title:title,
      text: text,
      icon: 'error',
      confirmButtonText:confirmButtonText
    });
  }



}
