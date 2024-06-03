import { Component, OnInit } from '@angular/core';
import { PlatoDTO } from '../../../modelos/PlatoDTO';
import { PlatoService } from '../../../servicios/plato.service';
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';
import { ResenaDTO } from '../../../modelos/ResenaDTO';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../modelos/Usuario';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-platos-usu',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterLink, DatePipe, NgxPaginationModule],
  templateUrl: './list-platos-usu.component.html',
  styleUrl: './list-platos-usu.component.css'
})
export class ListPlatosUsu implements OnInit{
  platos!: PlatoDTO[]; 
  plato!: PlatoDTO;
  resenas: ResenaDTO[]=[];
  usuario!: Usuario | undefined
  usuarioId!:number
  p: number = 1; // Variable para controlar la página actual

  constructor(
    private usuarioService: UsuariosService,
    private platoService: PlatoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let session=sessionStorage.getItem('userId')
    if(session != null){
      this.usuarioId = Number (session);
    }else{
      this.router.navigateByUrl("/inicio")
    }
    this.usuarioId = this.usuarioService.getUserId(); // Obtener el ID del usuario logueado
 
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
  editarPlato(id: number){
    this.router.navigateByUrl(`/editPlato/${id}`)
  }

  eliminarPlato(id: number) {
    this.platoService.deletePlato(id).subscribe({
      next: (response) => {
        this.sweetAlerta();
        this.router.navigateByUrl('/perfil');
      },
      error: (error) => {
        console.error('Ocurrió un error al eliminar el plato:', error);
      }
    });
  }

  sweetAlerta(){
    Swal.fire({
      title: "ok",
      text: "Plato eliminado correctamente",
      icon: 'success',
      confirmButtonText:'ok'
    });
  }
}
