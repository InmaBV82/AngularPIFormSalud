import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCategoriaService } from '../../servicios/listado-categoria.service';
import { Categoria } from '../../modelos/Categoria';

@Component({
  selector: 'app-listado-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-categorias.component.html',
  styleUrl: './listado-categorias.component.css'
})
export class ListadoCategoriasComponent implements OnInit {
  categorias !: Categoria[];

  constructor(
    private listadoService: ListadoCategoriaService
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
}
