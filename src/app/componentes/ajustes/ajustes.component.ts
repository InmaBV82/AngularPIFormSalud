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
/*Suscribirse al Observable en los componentes que necesito acceder al estado del usuario
o reaccionar a cambios en dicho estado.*/
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

  eliminarUsuario() {
    const confirmacion = confirm('Se eliminarán los platos e historicos asociados a su cuenta, ¿está seguro?');
    if(confirmacion){
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
    }
    
  }

  sweetAlerta(){
    Swal.fire({
      title: "ok",
      text: "Cuenta eliminada correctamente",
      icon: 'success',
      confirmButtonText:'Cool'
    });
  }


}
