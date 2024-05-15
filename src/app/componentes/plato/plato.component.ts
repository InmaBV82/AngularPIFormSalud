import { Component, OnInit } from '@angular/core';
import { PlatoDTO } from '../../modelos/PlatoDTO';
import { PlatoService } from '../../servicios/plato.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MenuPlatoComponent } from '../menu-plato/menu-plato.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ResenaDTO } from '../../modelos/ResenaDTO';

@Component({
  selector: 'app-plato',
  standalone: true,
  imports: [CommonModule, MenuPlatoComponent, DatePipe],
  templateUrl: './plato.component.html',
  styleUrl: './plato.component.css'
})
export class PlatoComponent implements OnInit{
  platoid!: number |null;
  plato!: PlatoDTO; 
  resenas: ResenaDTO[]=[];

  constructor(
    private route: ActivatedRoute,
    private platoService: PlatoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('platoid');
      if (id) {
        this.platoid = Number(id);
        if (!isNaN(this.platoid)) {
          this.cargarPlato(this.platoid);
        } else {
          console.error('El ID del plato no es un número válido');
        }
      }
    });
  }

  cargarPlato(platoid: number): void {
    this.platoService.getPlatoDTO(platoid).subscribe({
      next: (data: PlatoDTO) => {
        this.plato = data;
      },
      error: (err) => console.error('Error al cargar plato', err)
    });
  }

  volver() {
    this.router.navigate(['/menuplatos']);
}

}
