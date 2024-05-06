import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCategoriaService } from '../../servicios/listado-categoria.service';
import { PlatoService } from '../../servicios/plato.service';
import { Categoria } from '../../modelos/Categoria';
import { PlatoDTO } from '../../modelos/PlatoDTO';

@Component({
  selector: 'app-listado-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-categorias.component.html',
  styleUrl: './listado-categorias.component.css'
})
export class ListadoCategoriasComponent implements OnInit {
  categorias !: Categoria[];
  platos : PlatoDTO[]=[];

  constructor(
    private listadoService: ListadoCategoriaService,
    private platoService: PlatoService,
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.listadoService.obtenerCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
      },
      error: (error: any) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  
  }

  cargarPlatos(categoriaId: number): void {
    this.platoService.getPlatosCategoria(categoriaId).subscribe({
      next: (data: PlatoDTO[]) => {
        this.platos = data.map(plato => ({ ...plato, expanded: false }));
        console.log(this.platos)
      },
      error: (error: any) => {
        console.error('Error al obtener los platos:', error);
      }
    });
  }
  
  toggleResenas(plato: PlatoDTO): void {
    plato.expanded = !plato.expanded; 
    console.log(plato.expanded)
  }



 /* cargarPlatos(categoriaid:number): void {
    this.platoService.getPlatosDesayuno(categoriaid).subscribe({
      next: (data: PlatoDTO[]) => {
        this.platos = data;
      },
      error: (error: any) => {
        console.error('Error al obtener los platos:', error);
      }
    });
}*/



}