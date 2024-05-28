import { Component, OnInit } from '@angular/core';
import { PlatoDTO } from '../../modelos/PlatoDTO';
import { PlatoService } from '../../servicios/plato.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MenuPlatoComponent } from '../menu-plato/menu-plato.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ResenaDTO } from '../../modelos/ResenaDTO';

@Component({
  selector: 'app-detalle-plato',
  standalone: true,
  imports: [CommonModule, MenuPlatoComponent, DatePipe],
  templateUrl: './detalle-plato.component.html',
  styleUrl: './detalle-plato.component.css'
})
export class DetallePlatoComponent implements OnInit{
  platoid!: number |null;
  plato!: PlatoDTO; 
  resenas: ResenaDTO[]=[];
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private platoService: PlatoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let session=sessionStorage.getItem('userId')
    if(session != null){
      this.userId = Number (session);
    }else{
      this.router.navigateByUrl("/inicio")
    }
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
