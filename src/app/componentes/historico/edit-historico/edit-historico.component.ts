import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HistoricoService } from '../../../servicios/historico.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoService } from '../../../servicios/plato.service';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { PlatoDTO } from '../../../modelos/PlatoDTO';
import { HistoricoDTO } from '../../../modelos/HistoricoDTO';


@Component({
  selector: 'app-edit-historico',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './edit-historico.component.html',
  styleUrl: './edit-historico.component.css'
})
export class EditHistoricoComponent implements OnInit{

  usuarioId!: number
  platos: PlatoDTO[]=[]
  historico!: HistoricoDTO
  id: any= '';
  historicoForm!: FormGroup

  fecha = true;
  momentodia = true;
  platoid = true;


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private historicoService: HistoricoService,
    private router: Router,
    private platoService: PlatoService
  ) { 
    this.historicoForm= this.formBuilder.group({
      fecha: ['', Validators.required],
      momentodia: ['', Validators.required],
      platoid: ['', Validators.required],
  
    });
    this.cargarPlatos()
    
  }

  
  ngOnInit(): void {
    let session=sessionStorage.getItem('userId')
      
    if(session != null){
      this.usuarioId = Number (session);
    }else{
      this.router.navigateByUrl("/inicio")
    }
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.historicoService.getUnHistorico(this.id).subscribe({
        next: (data: HistoricoDTO) => {
          // se utiliza para asignar valores a un formulario reactivo en Angular
          this.historicoForm.patchValue(data);
          // Ahora que el formulario está inicializado no da error de undefined=>usuarioId
        },
        error: (err) => {
          console.error('Error al obtener el histórico', err);
        }
      });
    }
  }

  editarHistorico() {
    if(this.historicoForm.valid){
      this.historicoService.editHistoricoUsuario(this.id, this.historicoForm).subscribe({
        error: (e)=>{
          this.alertaPersonalizadaError("Error","Error al editar el Histórico","Error" )
        },
        next: (n) =>{
          this.router.navigateByUrl('/historico');
          this.alertaPersonalizadaOK("OK","Histórico modificado correctamente","Confirm" )
          
        }
      });
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

volver() {
  this.router.navigate(['/historico']);
}

}
