import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ListadoCategoriaService } from '../../servicios/listado-categoria.service';
import { PlatoService } from '../../servicios/plato.service';
import { ResenaService } from '../../servicios/resena.service';
import { Categoria } from '../../modelos/Categoria';
import { PlatoDTO } from '../../modelos/PlatoDTO';
import { ResenaDTO } from '../../modelos/ResenaDTO';
import { Usuario } from '../../modelos/Usuario';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-listado-categorias',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './listado-categorias.component.html',
  styleUrl: './listado-categorias.component.css'
})
export class ListadoCategoriasComponent implements OnInit {
  categorias : Categoria[]=[];
  platos : PlatoDTO[]=[];
  resenas: ResenaDTO[]=[];
  usuario!:Usuario | null | undefined

  constructor(
    private listadoService: ListadoCategoriaService,
    private platoService: PlatoService,
    private resenaService: ResenaService,
    private usuarioService: UsuariosService
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
    this.platos = [];
    this.resenas = [];  // Limpia las reseñas cada vez que se cambian los platos
    this.platoService.getPlatosCategoria(categoriaId).subscribe({
      next: (data: PlatoDTO[]) => {
        this.platos = data
      },
      error: (error: any) => {
        console.error('Error al obtener los platos:', error);
      }
    });
  }
  
  cargarResenas(platoid: number): void {
    this.resenas = [];// Limpia las reseñas antes de cargar nuevas
    this.resenaService.getResenasPlato(platoid).subscribe({
      next: (data: ResenaDTO[]) => {
        this.resenas = [];
        this.resenas = data
      },
      error: (error: any) => {
        console.error('Error al obtener los platos:', error);
      }
    });
  
  }

  comprobar(): boolean {
    return sessionStorage.getItem('userId') !== null;
  }

  
  crearResenas(){
      
  }




}