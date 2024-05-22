import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoService } from '../../../servicios/plato.service';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { ResenaService } from '../../../servicios/resena.service';
import { PlatoDTO } from '../../../modelos/PlatoDTO';
import { ResenaAddDTO } from '../../../modelos/ResenaAddDTO';



@Component({
  selector: 'app-edit-resena',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './edit-resena.component.html',
  styleUrl: './edit-resena.component.css'
})
export class EditResenaComponent implements OnInit{
  id: any= '';
  usuarioId!: number
  platos: PlatoDTO[]=[]
  resena!: ResenaAddDTO
  resenaForm!: FormGroup;

  comentario = true;
  fecha = true;
  puntuacion = true;
 // platoId = true;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private resenaService: ResenaService,
    private platoService: PlatoService,
    private router: Router
  
  ) {
    
    this.resenaForm = this.formBuilder.group({
      comentario: ['', Validators.required],
      fecha: ['', Validators.required],
      puntuacion: ['', Validators.required],
      platoId: ''

    });
  //  this.cargarPlatos()
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.resenaService.getUnaResenaAddDTO(this.id).subscribe({
        next: (data: ResenaAddDTO) => {
          // se utiliza para asignar valores a un formulario reactivo en Angular
          this.resenaForm.patchValue(data);
      //    console.log(data)
          this.resena=data
          // Ahora que el formulario está inicializado no da error de undefined=>usuarioId
        },
        error: (e) => {
          console.error('Error al obtener la reseña', e);
        }
      });
    } 
}

  editarResena() {
    if(this.resenaForm.valid){
      this.resenaService.editResena(this.id, this.resenaForm).subscribe({
        error: (e)=>{
          this.alertaPersonalizadaError("Error","Error al editar la reseña","Error" )
        },
        next: (n) =>{
          this.router.navigateByUrl('/perfil');
          this.alertaPersonalizadaOK("OK","Reseña modificada correctamente","Confirm" )
          
        }
      });
    }
  }

/* cargarPlatos(): void {
  this.platoService.getTodoslosPlatos().subscribe({
    next: (data: PlatoDTO[]) => {
      this.platos = data;
    },
    error: (err) => console.error('Error al cargar plato', err)
  });
}  */

volver() {
  this.router.navigateByUrl('/perfil');
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




}
