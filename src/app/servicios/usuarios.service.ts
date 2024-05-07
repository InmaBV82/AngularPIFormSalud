import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: Usuario[] = [];

  usuarioLogueado!: Usuario | null;

  private apiUrl: string;
  
  constructor(private http : HttpClient, private router : Router){
  this.apiUrl = 'http://localhost:8080/';
  this.cargarUsuarios();
  
  }
  

   //GET
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl+ 'usuarios');
  }

  //POST
  addUsuario(form:FormGroup){
      
      const usuarioData = {
        ...form.value,//...el operador de propagación es usado para crear una copia de las propiedades de un objeto en otro objeto
        rol: 'usuario'  // Establece un valor predeterminado para el rol
      };
    return this.http.post(this.apiUrl+ 'usuarioNuevo', usuarioData);
  }


   // Método para cargar usuarios
  cargarUsuarios() {
    this.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data; 
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }
  
//Autenticacion login
  login(email: string, password: string) {
    let existe: boolean =false
    for (let usu of this.usuarios) {
      if (usu.email == email && usu.password == password) {
        this.usuarioLogueado = usu
        this.router.navigateByUrl('/perfil');
        existe=true
        break;

      }
    }
    if(!existe){
      alert("Email no registrado")
    }
    
    return this.usuarioLogueado

  }


  logout() {
    this.usuarioLogueado=null
    this.router.navigateByUrl("/login")
  }

  getUsuarioLogueado() {
    return this.usuarioLogueado
  }

  

  /*agregarUsuario(usuario: Usuario) {
    console.log(this.usuarios)
    let existe : boolean = false
     // Establece el valor predeterminado para el rol
    usuario.rol = usuario.rol || 'usuario';
    let usuarioNuevo=usuario
    for (let usu of this.usuarios) {
      console.log(usu.email, usuarioNuevo.email);
      if(usuarioNuevo["email"]==usu["email"]){
        existe=true
        break;

      }
    }
    if(!existe){
      this.usuarios.push(usuarioNuevo);
    }
    return existe
    

  }*/


}
