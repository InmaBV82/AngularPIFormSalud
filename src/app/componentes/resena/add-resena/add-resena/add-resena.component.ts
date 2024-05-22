import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ResenaService } from '../../../../servicios/resena.service';
import { UsuariosService } from '../../../../servicios/usuarios.service';
import { Categoria } from '../../../../modelos/Categoria';
import { ListadoCategoriaService } from '../../../../servicios/listado-categoria.service';
import { ResenaAddDTO } from '../../../../modelos/ResenaAddDTO';
import { PlatoDTO } from '../../../../modelos/PlatoDTO';
import { PlatoService } from '../../../../servicios/plato.service';


@Component({
  selector: 'app-add-resena',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './add-resena.component.html',
  styleUrl: './add-resena.component.css'
})
export class AddResenaComponent implements OnInit{

  usuarioId!: number
  platos: PlatoDTO[]=[]
  resenaForm!: FormGroup;

  comentario = true;
  fecha = true;
  puntuacion = true;
  platoId = true;


  constructor(
    private formBuilder: FormBuilder,
    private resenaService: ResenaService,
    private platoService: PlatoService,
    private router: Router,
    private usuarioService: UsuariosService
  ) {
    
    this.resenaForm = this.formBuilder.group({
      comentario: ['', Validators.required],
      fecha: ['', Validators.required],
      puntuacion: ['', Validators.required],
      platoId:  ['', Validators.required]

    });
    
  }

  ngOnInit(): void {
    this.usuarioId = this.usuarioService.getUserId();
    this.cargarPlatos();
    
  }


  agregarResena() {
    //console.log(this.resenaForm.value)
    this.comentario = true;
    this.fecha = true;
    this.puntuacion = true;
    this.platoId = true;

    if(this.resenaForm.valid){
      this.resenaService.addResenaUsuario(this.resenaForm).subscribe({
        error: (e)=>{
          this.alertaPersonalizadaError("Error","Error al crear la resena","Error" )
        },
        next: (e) =>{
          this.router.navigateByUrl('/perfil');
          this.alertaPersonalizadaOK("OK","Reseña creado correctamente","Confirm" )
          
        }
      });
        
      }else{

        if (!this.resenaForm.controls["comentario"].valid) {
          this.comentario = false;
        } 
        if(!this.resenaForm.controls["fecha"].valid) {
          this.fecha = false;
        }  
        if(!this.resenaForm.controls["puntuacion"].valid) {
          this.puntuacion = false;
        }
        if(!this.resenaForm.controls["platoId"].valid) {
          this.platoId = false;
        }

      }

  }

  cargarPlatos(): void {
    this.platoService.getTodoslosPlatos().subscribe({
      next: (data: PlatoDTO[]) => {
        this.platos = data;
      },
      error: (err) => console.error('Error al cargar platos', err)
    });
  }
  
  volver() {
    this.router.navigate(['/perfil']);
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
