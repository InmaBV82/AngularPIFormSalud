import { Component, OnInit } from '@angular/core';
import { ResenaService } from '../../../servicios/resena.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule, DatePipe } from '@angular/common';
import { ResenaDTO } from '../../../modelos/ResenaDTO';



@Component({
  selector: 'app-todas-resenas-admin',
  standalone: true,
  imports: [DatePipe, CommonModule ],
  templateUrl: './todas-resenas-admin.component.html',
  styleUrl: './todas-resenas-admin.component.css'
})
export class TodasResenasAdminComponent implements OnInit {

  resenas: ResenaDTO[]=[];


  constructor(
    private resenaService: ResenaService,
    private router: Router
  ){  }

  ngOnInit(): void {
      this.cargarResenas();
  }

  cargarResenas(): void {
    this.resenas = [];// Limpia las reseñas antes de cargar nuevas
    this.resenaService.getResenas().subscribe({
      next: (data: ResenaDTO[]) => {
        this.resenas = [];
        this.resenas = data
      },
      error: (error: any) => {
        console.error('Error al obtener las reseñas:', error);
      }
    });
  }

  eliminarResena(id: number) {
    this.resenaService.deleteResena(id).subscribe({
      next: (response) => {
        this.sweetAlerta();
        this.router.navigateByUrl('/resenasAdmin');
      },
      error: (error) => {
        console.error('Ocurrió un error al eliminar la resena:', error);
      }
    });
  }

  sweetAlerta(){
    Swal.fire({
      title: "ok",
      text: "Reseña eliminada correctamente",
      icon: 'success',
      confirmButtonText:'Cool'
    });
  }

}
