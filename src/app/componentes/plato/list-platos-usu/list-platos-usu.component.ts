import { Component, OnInit } from '@angular/core';
import { PlatoDTO } from '../../../modelos/PlatoDTO';
import { PlatoService } from '../../../servicios/plato.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ResenaDTO } from '../../../modelos/ResenaDTO';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../modelos/Usuario';

@Component({
  selector: 'app-list-platos-usu',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterLink],
  templateUrl: './list-platos-usu.component.html',
  styleUrl: './list-platos-usu.component.css'
})
export class ListPlatosUsu implements OnInit{
  platos!: PlatoDTO[]; 
  plato!: PlatoDTO;
  resenas: ResenaDTO[]=[];
  usuario!: Usuario | undefined
  usuarioId!:number

  constructor(
    private usuarioService: UsuariosService,
    private platoService: PlatoService
  ) { }

  ngOnInit(): void {
    this.usuarioId = this.usuarioService.getUserId(); // Obtener el ID del usuario logueado
  /*Suscribirse al Observable en los componentes que necesito acceder al estado del usuario
o reaccionar a cambios en dicho estado.*/
    this.usuarioService.getUserObservable().subscribe(
      (user: Usuario | undefined)=>{
        if(user && user.id){
          this.usuarioId=user.id
        }
        this.usuario=user
      }
    )
    this.cargarPlatos();
    
  }

  cargarPlatos(): void {
    if (this.usuarioId) {
    this.platoService.getPlatosUsuario().subscribe({
      next: (platos) => {
        this.platos = platos;
      },
      error: (err) => console.error('Error al cargar los `platos', err)
      
    });

    }
  }


  alertaPersonalizadaError(title:string, text:string, confirmButtonText:string){
    Swal.fire({
      title:title,
      text: text,
      icon: 'error',
      confirmButtonText:confirmButtonText
    });
  }
}
