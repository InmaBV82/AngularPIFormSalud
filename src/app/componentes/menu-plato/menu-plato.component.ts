import { Component, OnInit } from '@angular/core';
import { MenuPlatoDTO } from '../../modelos/MenuPlatoDTO';
import { MenuPlatoService } from '../../servicios/menu-plato.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TiposService } from '../../servicios/tipos.service';
import { Tipo } from '../../modelos/Tipo';


@Component({
  selector: 'app-menu-plato',
  standalone: true,
  imports: [CommonModule, RouterModule, EncabezadoComponent, NgxPaginationModule, FormsModule ],
  templateUrl: './menu-plato.component.html',
  styleUrl: './menu-plato.component.css'
})
export class MenuPlatoComponent  implements OnInit {
  menus: any[] = [];
  tipos!: Tipo[];
  userId!:number;
  p: number = 1; // Variable para controlar la página actual



  constructor(
    private menuPlatoService: MenuPlatoService,
    private tiposService: TiposService,
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
      // Convertir el diccionario en un array para mostrarlo en la vista
      this.menus = Object.keys(data).map(key => ({ key, value: data[key] })); 
    });

    this.tiposService.obtenerTipos().subscribe({
      next: (data: Tipo[]) => {
        this.tipos = data;
      },
      error: (error: any) => {
        console.error('Error al obtener los tipos de menú:', error);
      }
    });

  }

  buscar(tipo: string): void {
  
    if (tipo.trim() === '') {
      console.warn('Tipo de menú no válido o vacío.');
      this.menus = [];
      return;
    }

    this.menuPlatoService.getFiltroMenuPlatoPorTipo(tipo).subscribe({
      next: (data: any) => {
        // Convertir el diccionario en un array para mostrarlo en la vista
        this.menus = Object.keys(data).map(key => ({ key, value: data[key] })); 
        if (data.length === 0) {
          this.alertaPersonalizadaError("Información", "No se encontraron menús con el tipo seleccionado", "info");
        }
      },
      error: (error: any) => {
        this.alertaPersonalizadaError("Error", "No se encontraron menús", "error");
        this.menus = []; // Vacía la lista de menús para que no permanezcan las últimas filtradas
        console.error('Error al obtener los menús diseñados:', error);
      }
    });
  
  }

  

  
  alertaPersonalizadaError(title:string, text:string, confirmButtonText:string){
    Swal.fire({
      title:title,
      text: text,
      icon: 'error',
      confirmButtonText:confirmButtonText
    });
  }
  
  }
  




