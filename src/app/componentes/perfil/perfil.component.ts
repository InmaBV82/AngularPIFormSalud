import { Component, OnInit } from '@angular/core';
import { ListadoCategoriasComponent } from '../listado-categorias/listado-categorias.component';
import { PanelDesplegableComponent } from '../panel-desplegable/panel-desplegable.component';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../modelos/Usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [EncabezadoComponent,ListadoCategoriasComponent, PanelDesplegableComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  userId!:number
  constructor(private route: Router){
    
  }

  ngOnInit(): void {
    let session=sessionStorage.getItem('userId')
      
    if(session != null){
      this.userId = Number (session);
    }else{
      this.route.navigateByUrl("/login")
    }
  }


}


