import { Component } from '@angular/core';
import { ListadoCategoriasComponent } from '../listado-categorias/listado-categorias.component';
import { PanelDesplegableComponent } from '../panel-desplegable/panel-desplegable.component';
import { EncabezadoComponent } from '../encabezado/encabezado.component';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [EncabezadoComponent,ListadoCategoriasComponent, PanelDesplegableComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}
