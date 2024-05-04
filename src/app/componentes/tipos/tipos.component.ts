import { Component, OnInit, Pipe} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposService } from '../../servicios/tipos.service';
import { Tipo } from '../../modelos/Tipo';




@Component({
  selector: 'app-tipos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tipos.component.html',
  styleUrl: './tipos.component.css'
})
export class TiposComponent implements OnInit {
  tipos !: Tipo[];

  constructor(

    private tipoService: TiposService
  ) {}

  ngOnInit(): void {
    this.cargarTipos();
  }


cargarTipos(): void {
    this.tipoService.obtenerTipos()
.subscribe({
      next: (data) => {
        this.tipos = data;
      },
      error: (error) => {
        console.error('Error al obtener los tipos de menús:', error);
      }
    });
  }
}
