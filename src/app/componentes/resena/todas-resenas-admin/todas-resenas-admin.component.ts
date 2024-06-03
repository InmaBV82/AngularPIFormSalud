import { Component, OnInit } from '@angular/core';
import { ResenaService } from '../../../servicios/resena.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule, DatePipe } from '@angular/common';
import { ResenaDTO } from '../../../modelos/ResenaDTO';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-todas-resenas-admin',
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './todas-resenas-admin.component.html',
  styleUrl: './todas-resenas-admin.component.css'
})
export class TodasResenasAdminComponent implements OnInit {

  resenas: ResenaDTO[]=[];
  usuarioId!: number;
  p: number = 1; // Variable para controlar la página actual


  constructor(
    private resenaService: ResenaService,
    private router: Router
  ){  }

  ngOnInit(): void {
    let session=sessionStorage.getItem('userId')
    if(session != null){
      this.usuarioId = Number (session);
    }else{
      this.router.navigateByUrl("/inicio")
    }
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
        this.alertaPersonalizadaOK("OK","Reseña eliminada correctamente","Confirm" )
        this.router.navigateByUrl('/todasResenas');
      },
      error: (error) => {
        console.error('Ocurrió un error al eliminar la resena:', error);
      }
    });
  }


  buscar(puntuacion: string): void {
    const puntuacionNumero = Number(puntuacion);
    console.log(puntuacionNumero)

    if (isNaN(puntuacionNumero) || puntuacion.trim() === '') {
      this.alertaPersonalizadaError("Error","Introduce una puntuación","Error" )
      return;
    }
    this.resenaService.getFiltroResenasPuntuacion(puntuacionNumero).subscribe({
      next: (data: ResenaDTO[]) => {
        this.resenas = data;
        console.log('Reseñas filtradas:', data);
      },
      error: (error: any) => {
        this.alertaPersonalizadaError("Error","No hay resultados con esa puntuación","Error" )
        this.resenas=[]//vacía la lista de resenas para que no permanezcan las últimas filtradas
        console.error('Error al obtener las reseñas:', error);
      }
    });
  }


  alertaPersonalizadaOK(title:string, text:string, confirmButtonText:string){
    Swal.fire({
      title:title,
      text: text,
      icon: 'success',
      confirmButtonText:confirmButtonText
    });
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


