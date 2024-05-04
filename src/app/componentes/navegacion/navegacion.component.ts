import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent {

  usuario:any = null
  
  constructor(private usuarioService:UsuariosService){

  }
  comprobar(){
    this.usuario=this.usuarioService.getUsuarioLogueado()
    return this.usuario
    
  }

  salir(){
    this.usuario=this.usuarioService.logout()

    return this.usuario
  }

}


