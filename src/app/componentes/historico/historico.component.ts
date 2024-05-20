import { Component, OnInit } from '@angular/core';
import { HistoricoDTO } from '../../modelos/HistoricoDTO';
import { HistoricoService } from '../../servicios/historico.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../modelos/Usuario';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {
  usuario!: Usuario | undefined
  usuarioId!: number
  historicos: HistoricoDTO[]=[]

  constructor(
    private usuarioService: UsuariosService,
    private historicoService: HistoricoService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.usuarioId = this.usuarioService.getUserId();
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
    this.cargarHistoricosUsuario()
  
  }

  cargarHistoricosUsuario(): void {
    if (this.usuarioId) {
      this.historicoService.getHistoricoUsuario().subscribe({
        next: (historicos) => {
          this.historicos = historicos;
        },
        error: (err) => console.error('Error al cargar histórico', err)
      });
    }
    else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }

  addHistorico(){
    this.router.navigateByUrl("/addHistorico")
  }

  editarHistorico(idHistorico: number){
    this.router.navigateByUrl(`/editHistorico/${idHistorico}`)
  }

  eliminarHistorico(idHistorico: number) {
    this.historicoService.deleteHistorico(idHistorico).subscribe({
      next: (response) => {
        this.sweetAlerta();
        this.router.navigateByUrl('/perfil');
      },
      error: (error) => {
        console.error('Ocurrió un error al eliminar el histórico:', error);
      }
    });
  }

  sweetAlerta(){
    Swal.fire({
      title: "ok",
      text: "Histórico eliminado correctamente",
      icon: 'success',
      confirmButtonText:'Cool'
    });
  }

}
  


