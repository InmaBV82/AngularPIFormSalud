import { Component } from '@angular/core';
import { ListadoCategoriasComponent } from '../listado-categorias/listado-categorias.component';
import { EncabezadoComponent } from '../encabezado/encabezado.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [EncabezadoComponent,ListadoCategoriasComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
