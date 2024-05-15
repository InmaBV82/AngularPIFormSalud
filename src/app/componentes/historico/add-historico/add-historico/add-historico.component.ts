import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HistoricoService } from '../../../../servicios/historico.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PlatoService } from '../../../../servicios/plato.service';
import { UsuariosService } from '../../../../servicios/usuarios.service';
import { PlatoDTO } from '../../../../modelos/PlatoDTO';


@Component({
  selector: 'app-add-historico',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './add-historico.component.html',
  styleUrl: './add-historico.component.css'
})
export class AddHistoricoComponent implements OnInit{

  usuarioId!: number
  platos: PlatoDTO[]=[]
  historicoForm!: FormGroup;

  fecha = true;
  momentodia = true;
  platoid = true;
  nombrePlato = true;


  constructor(
    private formBuilder: FormBuilder,
    private historicoService: HistoricoService,
    private router: Router,
    private platoService: PlatoService,
    private usuarioService: UsuariosService
  ) {
    this.historicoForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      momentodia: ['', Validators.required],
      platoid: ['', Validators.required],

    });
  }
  ngOnInit(): void {
    this.usuarioId = this.usuarioService.getUserId();
    this.cargarPlatos();
  }


  agregarHistorico() {
    this.fecha = true;
    this.momentodia = true;
    this.platoid = true;
    

    
    if(this.historicoForm.valid){
      this.historicoService.addHistoricoUsuario(this.historicoForm).subscribe({
        error: (e)=>{
          this.alertaPersonalizadaError("Error","Error al crear el Histórico","Error" )
        },
        next: (e) =>{
          this.router.navigateByUrl('/historico');
          this.alertaPersonalizadaOK("OK","Histórico creado correctamente","Confirm" )
          
        }
      });
        
      }else{

        if (!this.historicoForm.controls["fecha"].valid) {
          this.fecha = false;
        } 
        if(!this.historicoForm.controls["momentodia"].valid) {
          this.momentodia = false;
        }  
        if(!this.historicoForm.controls["platoid"].valid) {
          this.platoid = false;
        }


      }

  }
  alertaPersonalizadaOK(title:string, text:string, confirmButtonText:string){
    Swal.fire({
      title:title,
      text: text,
      icon: 'success',
      confirmButtonText:confirmButtonText
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

cargarPlatos(): void {
  this.platoService.getTodoslosPlatos().subscribe({
    next: (data: PlatoDTO[]) => {
      this.platos = data;
    },
    error: (err) => console.error('Error al cargar plato', err)
  });
}


}
