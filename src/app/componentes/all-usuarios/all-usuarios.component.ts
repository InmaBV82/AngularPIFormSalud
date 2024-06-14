import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/Usuario';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-all-usuarios',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './all-usuarios.component.html',
  styleUrl: './all-usuarios.component.css'
})
export class AllUsuariosComponent implements OnInit {

  usuarios: Usuario[]=[];
  usuarioId!: number;
  p: number = 1; // Variable para controlar la página actual


  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ){  }

  ngOnInit(): void {
    let session=sessionStorage.getItem('userId')
    if(session == null){
      this.router.navigateByUrl("/inicio")
    }
    if (!this.usuarioService.isAdmin()) {
      this.router.navigateByUrl("/inicio");
      return;
    }
      this.cargarUsuarios();
    
  }

  cargarUsuarios(): void {
    this.usuarios = [];// Limpia la lista  antes de cargar nuevas
    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = [];
        this.usuarios = data
      },
      error: (error: any) => {
        console.error('Error al obtener los usuarios:', error);
      }
    });
  }

}
