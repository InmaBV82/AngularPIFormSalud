import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../modelos/Usuario';
import { AjustesService } from '../../servicios/ajustes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  standalone: true,
  imports: [],
  templateUrl: './ajustes.component.html',
  styleUrl: './ajustes.component.css'
})
export class AjustesComponent implements OnInit{
  usuario!: Usuario 
  usuarioId!: number

  constructor(
    private usuarioService: UsuariosService,
    private ajustesService: AjustesService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuarioId = this.usuarioService.getUserId();
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    if (this.usuarioId) {
      this.ajustesService.getUsuario().subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (error: any) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      });
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }

  editarUsuario(){

  }

  eliminarUsuario(usuarioId:number){
    const confirmacion = confirm('¿Está seguro que desea eliminar este usuario?');
    if (confirmacion) {
      this.usuarioService.deleteUsuarioById(usuarioId).subscribe({
        next: (response) => {
          console.log('Usuario eliminado correctamente.');
          this.usuarioService.logout()
          this.router.navigateByUrl('/inicio');
        },
        error: (error) => {
          console.error('Ocurrió un error al eliminar el usuario:', error);
        }
      });
    }

    this.usuarioService.deleteUsuarioById(usuarioId);

  }

}
