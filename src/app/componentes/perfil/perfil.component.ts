import { Component } from '@angular/core';
import { ListadoCategoriasComponent } from '../listado-categorias/listado-categorias.component';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ListadoCategoriasComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}
