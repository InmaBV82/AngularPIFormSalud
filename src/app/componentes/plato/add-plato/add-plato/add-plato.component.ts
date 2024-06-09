import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PlatoService } from '../../../../servicios/plato.service';
import { UsuariosService } from '../../../../servicios/usuarios.service';
import { PlatoDTO } from '../../../../modelos/PlatoDTO';
import { Categoria } from '../../../../modelos/Categoria';
import { ListadoCategoriaService } from '../../../../servicios/listado-categoria.service';
import { PlatoAddDTO } from '../../../../modelos/PlatoAddDTO';


@Component({
  selector: 'app-add-plato',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './add-plato.component.html',
  styleUrl: './add-plato.component.css'
})
export class AddPlatoComponent implements OnInit{

  usuarioId!: number
  categorias: Categoria[]=[]
  platoForm!: FormGroup;

  nombre = true;
  descripcion = true;
  foto = true;
  ingredientes = true;
  tiempo = true;
  categoriaid = true;


  constructor(
    private formBuilder: FormBuilder,
    private platoService: PlatoService,
    private categoriaService: ListadoCategoriaService,
    private router: Router,
    private usuarioService: UsuariosService
  ) {
    
    this.platoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      foto: '',
      ingredientes: ['', Validators.required],
      tiempo: ['', Validators.required],
      categoriaid:  ['', Validators.required]

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
    this.cargarCategorias();
    
  }


  agregarPlato() {
    //console.log(this.platoForm.value)
    this.nombre = true;
    this.descripcion = true;
    this.foto = true;
    this.ingredientes = true;
    this.tiempo = true;
    this.categoriaid = true;

    if(this.platoForm.valid){
      this.platoService.addPlatoUsuario(this.platoForm).subscribe({
        error: (e)=>{
          this.alertaPersonalizadaError("Error","Error al crear el Plato","Error" )
        },
        next: (e) =>{
          this.router.navigateByUrl('/misPlatos');
          this.alertaPersonalizadaOK("OK","Plato creado correctamente","Confirm" )
          
        }
      });
        
      }else{

        if (!this.platoForm.controls["nombre"].valid) {
          this.nombre = false;
        } 
        if(!this.platoForm.controls["descripcion"].valid) {
          this.descripcion = false;
        }  
        if(!this.platoForm.controls["foto"].valid) {
          this.foto = false;
        } 
        if(!this.platoForm.controls["ingredientes"].valid) {
          this.ingredientes = false;
        }
        if(!this.platoForm.controls["tiempo"].valid) {
          this.tiempo = false;
        }
        if(!this.platoForm.controls["categoriaid"].valid) {
          this.categoriaid = false;
        }

      }

  }

cargarCategorias(): void {
  this.categoriaService.obtenerCategorias().subscribe({
    next: (data: Categoria[]) => {
      this.categorias = data;
    },
    error: (err) => console.error('Error al cargar categoria', err)
  });
}

volver() {
  this.router.navigateByUrl('/misPlatos');
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
