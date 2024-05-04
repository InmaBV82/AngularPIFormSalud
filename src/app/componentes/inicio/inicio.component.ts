import { Component } from '@angular/core';
import { CategoriaComponent } from '../categoria/categoria.component';
import { ListadoCategoriasComponent } from '../listado-categorias/listado-categorias.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CategoriaComponent, ListadoCategoriasComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
