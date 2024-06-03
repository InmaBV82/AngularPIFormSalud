import { Component, OnInit } from '@angular/core';
import { MenuPlatoDTO } from '../../modelos/MenuPlatoDTO';
import { MenuPlatoService } from '../../servicios/menu-plato.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-menu-plato',
  standalone: true,
  imports: [CommonModule, RouterModule, EncabezadoComponent, NgxPaginationModule ],
  templateUrl: './menu-plato.component.html',
  styleUrl: './menu-plato.component.css'
})
export class MenuPlatoComponent  implements OnInit {
  menus: any[] = [];
  userId!:number;
  p: number = 1; // Variable para controlar la página actual



  constructor(
    private menuPlatoService: MenuPlatoService,
    private route: Router

  ) {  
    

  }

  ngOnInit(): void {
    let session=sessionStorage.getItem('userId')
    if(session != null){
      this.userId = Number (session);
    }else{
      this.route.navigateByUrl("/inicio")
    }

    this.menuPlatoService.obtenerMenuPlatos().subscribe((data: any) => {
      // Convertir el diccionario en un array para la paginación
      this.menus = Object.keys(data).map(key => ({ key, value: data[key] })); 
    });
  }
  
  }
  




