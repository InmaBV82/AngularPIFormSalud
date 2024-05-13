import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../modelos/Usuario';
import { AjustesService } from '../../servicios/ajustes.service';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent implements OnInit{

  usuario!: Usuario | null
  usuarioId!: number
  
  constructor(private usuarioService:UsuariosService, private ajustesService:AjustesService ){

  }

  ngOnInit(): void {
    this.usuarioId = this.usuarioService.getUserId();
    this.cargarUsuario();//si lo comento no accede al nombre y si en el html quito ? tampoco
  }

  cargarUsuario(): void{
    if (this.usuarioId) {
      this.ajustesService.getUsuario().subscribe({
        next: (data) => {
          this.usuario = data;
          console.log(this.usuario)
        },
        error: (error: any) => {
          console.error('Error al obtener los datos del usuario:', error);
          
        }
      });
    } else {
      console.error('No se pudo obtener el ID del usuario');
    
    }
  }

  comprobar(): boolean {
    return sessionStorage.getItem('userId') !== null;
  }

  salir(): void {
    sessionStorage.removeItem('userId');
  
  }

}


