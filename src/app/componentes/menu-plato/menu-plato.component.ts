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
  menus: any[] = [];
  userId!:number


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
      this.menus = data; 
    });
  }
  


  }
  


 /*  cargarMenuPlatos(): void {
    this.menuPlatoService.obtenerMenuPlatos().subscribe({
      next: (menus) => {
        // Convertir el objeto en un array
        this.menus = Object.values(menus);
      },
      error: (error) => console.error('Error al cargar los menús con los platos', error)
    });
  } */




