import { Component, OnInit} from '@angular/core';
import { ResenaDTO } from '../../modelos/ResenaDTO';
import { UsuariosService } from '../../servicios/usuarios.service';
import { ResenaService } from '../../servicios/resena.service';
import { CommonModule } from '@angular/common';
import { ResenaComponent } from '../resena/resena.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel-desplegable',
  standalone: true,
  imports: [CommonModule, ResenaComponent, RouterModule],
  templateUrl: './panel-desplegable.component.html',
  styleUrl: './panel-desplegable.component.css'
})
export class PanelDesplegableComponent implements OnInit {
  usuarioId!:number
  resenas: ResenaDTO[]=[];
  mostrarResenas: boolean = false;  // Para controlar la visualización
  

  constructor(
    private usuarioService: UsuariosService, 
    private resenaService: ResenaService
  ) {}


  ngOnInit(): void {
    this.usuarioId = this.usuarioService.getUserId(); // Obtener el ID del usuario logueado
  }

  cargarResenas(): void {
    if (this.usuarioId) {
      this.resenaService.getResenasUsuario().subscribe({
        next: (resenas) => {
          this.resenas = resenas;
        },
        error: (err) => console.error('Error al cargar reseñas', err)
      });
    }
    else {
      console.error('No se pudo obtener el ID del usuario');
    }

    this.mostrarResenas = true;
  }

}