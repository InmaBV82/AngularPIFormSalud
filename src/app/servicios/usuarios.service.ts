import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/Usuario';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: Usuario[] = [];

  usuarioLogueado!: Usuario | undefined | null;
  user$=new BehaviorSubject<Usuario | undefined>(undefined);


  private apiUrl: string;
  
  constructor(
    private http : HttpClient,
    private router : Router,

  ){
  this.apiUrl = 'http://localhost:8099/';
  if(this.getUserId()){
    this.getUnUsuario(this.getUserId()).subscribe(
      (user:Usuario)=>{this.setUser(user)}
    )

  }
  
  }
  
//devolver el observable para los componentes que necesito 
  getUserObservable(): Observable<Usuario | undefined>{
    return this.user$.asObservable();

  }

  setUser(usuario:Usuario){
    this.user$.next(usuario);

  }
  

   //GET
   //todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl+ 'usuarios');
  }

  //cargar un usuario por Id
  getUnUsuario(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl+ 'usuario/' + userId);
  }

  
  //POST//REGISTRO
  addUsuario(form:FormGroup){
      
      const usuarioData = {
        ...form.value,//...el operador de propagación es usado para crear una copia de las propiedades de un objeto en otro objeto
        rol: 'usuario'  // Establece un valor predeterminado para el rol
      };
    return this.http.post(this.apiUrl+ 'usuarioNuevo', usuarioData);
  }

//POST-RECUPERAR CONTRASEÑA
recuperarPassword(nombre: string, email: string): Observable<any> {
  return this.http.post(this.apiUrl+ 'recuperarPassword/'+ nombre + '/'+ email, {});
}


  //LOGIN APIREST
  loginUsuario(data : any): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl+ 'login', data);
  }


  //DELETE
  deleteUsuarioById(usuarioId:number): Observable<Usuario> {
      return this.http.delete<Usuario>(this.apiUrl+ 'usuarioDelete/'+usuarioId);
    }


  //GUARDAR USUARIO conviertiendo el id en string para guardarlo en el sessionstorage
  saveUserId(userId: number) {
    sessionStorage.setItem('userId', userId.toString());
  }

  getUserId(): number {//devolver el userId convertido en number
    const id = sessionStorage.getItem('userId');
    const parsedId = id ? parseInt(id, 10) : 0;
  //  console.log(this.getUserId)
    return Number.isNaN(parsedId) ? 0 : parsedId;
  }

  //comprobar si el usuario es admin
  isAdmin(): boolean {
    const userId = sessionStorage.getItem('userId');
    return userId === '1'; // Porque el ID del administrador es 1
  }
  


  logout() {
    this.usuarioLogueado = null;
    sessionStorage.removeItem('userId');// Borra el userId de la sessionStorage
    this.user$.next(undefined) 
    
  }
  
  //PUT
// Uso `tap` para actualizar el `BehaviorSubject` con el usuario actualizado
editarUsuario(id: number, form: FormGroup): Observable<Usuario> {
  const usuarioUpdate = form.value;
  return this.http.put<Usuario>(this.apiUrl + 'editarUsuario/' + id, usuarioUpdate).pipe(
    tap((updatedUser: Usuario) => {
      this.setUser(updatedUser);
    })
  );
}



}
