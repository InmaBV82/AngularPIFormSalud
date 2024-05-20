import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../modelos/Usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajustes',
  standalone: true,
  imports: [],
  templateUrl: './ajustes.component.html',
  styleUrl: './ajustes.component.css'
})
export class AjustesComponent implements OnInit{
  usuario!: Usuario | undefined
  usuarioId!: number

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUserObservable().subscribe(
      (user: Usuario | undefined)=>{
        if(user && user.id){
          this.usuarioId=user.id
        }
        this.usuario=user
      }
      
    )
  }



  editarUsuario(){

  }

 /* eliminarUsuario(usuarioId:number){
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

  }*/


  eliminarUsuario(){
   /* const confirmacion = confirm('¿Está seguro que desea eliminar este usuario?');
    if (confirmacion) {*/
      this.usuarioService.deleteUsuarioById(this.usuarioId).subscribe({
        next: (response) => {
          this.sweetAlerta();
          this.usuarioService.logout()
          this.router.navigateByUrl('/inicio');
        },
        error: (error) => {
          console.error('Ocurrió un error al eliminar el usuario:', error);
        }
      });
    //}

  }

  sweetAlerta(){
    Swal.fire({
      title: "ok",
      text: "Usuario eliminado correctamente",
      icon: 'success',
      confirmButtonText:'Cool'
    });
  }

}
