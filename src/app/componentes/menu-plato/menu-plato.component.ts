import { Component, OnInit } from '@angular/core';
import { MenuPlatoDTO } from '../../modelos/MenuPlatoDTO';
import { MenuPlatoService } from '../../servicios/menu-plato.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EncabezadoComponent } from '../encabezado/encabezado.component';


@Component({
  selector: 'app-menu-plato',
  standalone: true,
  imports: [CommonModule, RouterModule, EncabezadoComponent],
  templateUrl: './menu-plato.component.html',
  styleUrl: './menu-plato.component.css'
})
export class MenuPlatoComponent  implements OnInit {
  menuPlatos: MenuPlatoDTO[]=[]
  userId!:number
  constructor(
    private menuPlatoService: MenuPlatoService,
    private route: Router

  ) {  
    this.cargarMenuPlatos()

  }

  ngOnInit(): void {
    let session=sessionStorage.getItem('userId')
    if(session != null){
      this.userId = Number (session);
    }else{
      this.route.navigateByUrl("/inicio")
    }
  
  }

  cargarMenuPlatos(): void {
    this.menuPlatoService.getMenuPlato().subscribe({
      next: (menuPlatos) => {
        this.menuPlatos = menuPlatos;
      },
      error: (err) => console.error('Error al cargar los menús con los platos', err)
    });
  }


}
