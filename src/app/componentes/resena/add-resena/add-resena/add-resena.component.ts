import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
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
  resena!: ResenaAddDTO;
  platoid!: number;
  plato!: PlatoDTO;

  comentario = true;
  fecha = true;
  puntuacion = true;
  


  constructor(
    private formBuilder: FormBuilder,
    private resenaService: ResenaService,
    private platoService: PlatoService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuariosService
  ) {
    
    this.resenaForm = this.formBuilder.group({
      comentario: ['', Validators.required],
      fecha: ['', Validators.required],
      puntuacion: ['', Validators.required],
    //  platoId:  ['', Validators.required]

    });
    
  }

  ngOnInit(): void {
    let session=sessionStorage.getItem('userId')
    if(session != null){
      this.usuarioId = Number (session);
    }else{
      this.router.navigateByUrl("/inicio")
    }
    
    this.usuarioId = this.usuarioService.getUserId();
    this.route.paramMap.subscribe(params => {
      const id = params.get('platoid');
      if (id) {
        this.platoid = Number(id);
        if (!isNaN(this.platoid)) {
          this.cargarPlato(this.platoid);
        } else {
          console.error('El ID del plato no es un número válido');
        }
      }
    });
   // this.cargarPlatos();
    
  }

  cargarPlato(platoid: number): void {
    this.platoService.getPlatoDTO(platoid).subscribe({
      next: (data: PlatoDTO) => {
        this.plato = data;
      },
      error: (err) => console.error('Error al cargar plato', err)
    });
  }


  agregarResena() {
    this.comentario = true;
    this.fecha = true;
    this.puntuacion = true;

    if (this.resenaForm.valid) {
      const resenaAddData: ResenaAddDTO = {
        ...this.resenaForm.value,
        platoId: this.platoid
      };

      this.resenaService.addResenaUsuario(resenaAddData).subscribe({
        error: (e) => {
          this.alertaPersonalizadaError("Error", "Error al crear la reseña", "Error");
        },
        next: () => {
          this.router.navigateByUrl('/perfil');
          this.alertaPersonalizadaOK("OK", "Reseña creada correctamente", "Confirm");
        }
      });
    } else {
      if (!this.resenaForm.controls["comentario"].valid) {
        this.comentario = false;
      }
      if (!this.resenaForm.controls["fecha"].valid) {
        this.fecha = false;
      }
      if (!this.resenaForm.controls["puntuacion"].valid) {
        this.puntuacion = false;
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
