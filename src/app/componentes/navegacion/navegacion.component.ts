import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../modelos/Usuario';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent implements OnInit{
  
  usuario!: Usuario | undefined
  usuarioId!: number
  
  constructor(private usuarioService:UsuariosService, private router: Router ){

  }

/*Suscribirse al Observable en los componentes que necesito acceder al estado del usuario
o reaccionar a cambios en dicho estado.*/
  ngOnInit(): void {
    this.usuarioService.getUserObservable().subscribe(
      (user: Usuario | undefined)=>{
        if(user && user.id){
          this.usuarioId=user.id
        }
        this.usuario=user
      }
    )
  }

  comprobar(): boolean {
    return sessionStorage.getItem('userId') !== null;
  }

  salir(): void {
    sessionStorage.removeItem('userId');
   // this.router.navigateByUrl("/login");
    window.location.reload() //me lleva a la vista de inicio
    
  
  }

  
  comprobarAdmin(): boolean{
    if(this.usuarioId == 1){

      return true;
    }

    return false;

  }

}


