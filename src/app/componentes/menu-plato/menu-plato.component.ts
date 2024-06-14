import { Component, OnInit } from '@angular/core';
import { MenuPlatoService } from '../../servicios/menu-plato.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TiposService } from '../../servicios/tipos.service';
import { Tipo } from '../../modelos/Tipo';
import { MenuService } from '../../servicios/menu.service';


@Component({
  selector: 'app-menu-plato',
  standalone: true,
  imports: [CommonModule, RouterModule, EncabezadoComponent, NgxPaginationModule, FormsModule, RouterLink],
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
    private menuService: MenuService,
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
      alert('Tipo de menú no válido o vacío.');
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

      }
    });
  
  }

  comprobarAdmin(): boolean{
    if(this.userId == 1){

      return true;
    }

    return false;

  }

  eliminarMenu(idmenu: number) {
    this.menuService.deleteMenu(idmenu).subscribe({
      error: (e) => {
        console.error("Error al borrar el Menú");
      },
      next: (n) => {
        console.log("Menú borrado");
        // Actualizo la lista de menús diseñados en el frontend,filtrando la lista de menús para eliminar el menú que se acabo de borrar. 
        this.menus = this.menus.filter(menu => menu.value[0].menuid !== idmenu);
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
  




