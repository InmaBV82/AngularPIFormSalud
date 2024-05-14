import { Component, OnInit } from '@angular/core';
import { HistoricoDTO } from '../../modelos/HistoricoDTO';
import { HistoricoService } from '../../servicios/historico.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {
  usuarioId!: number
  historicos: HistoricoDTO[]=[]

  constructor(
    private usuarioService: UsuariosService,
    private historicoService: HistoricoService

  ) { }

  ngOnInit(): void {
    this.usuarioId = this.usuarioService.getUserId();
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

}
