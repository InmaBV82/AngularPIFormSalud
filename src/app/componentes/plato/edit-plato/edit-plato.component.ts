import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoService } from '../../../servicios/plato.service';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Categoria } from '../../../modelos/Categoria';
import { ListadoCategoriaService } from '../../../servicios/listado-categoria.service';
import { PlatoAddDTO } from '../../../modelos/PlatoAddDTO';



@Component({
  selector: 'app-edit-plato',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './edit-plato.component.html',
  styleUrl: './edit-plato.component.css'
})
export class EditPlatoComponent implements OnInit{
  id: any= '';
  usuarioId!: number
  categorias: Categoria[]=[]
  platoForm!: FormGroup;

  nombre = true;
  descripcion = true;
  //foto = true;
  ingredientes = true;
  tiempo = true;
  categoriaid = true;


  constructor(
    private formBuilder: FormBuilder,
    private platoService: PlatoService,
    private categoriaService: ListadoCategoriaService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    
    this.platoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      //foto: '',
      ingredientes: ['', Validators.required],
      tiempo: ['', Validators.required],
      categoriaid:  ['', Validators.required]

    });
    this.cargarCategorias();
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.platoService.getUnPlatoAddDTO(this.id).subscribe({
        next: (data: PlatoAddDTO) => {
          // se utiliza para asignar valores a un formulario reactivo en Angular
          this.platoForm.patchValue(data);
          console.log(data)
          // Ahora que el formulario está inicializado no da error de undefined=>usuarioId
        },
        error: (e) => {
          console.error('Error al obtener el plato', e);
        }
      });
    }
    
    
  }


  editarPlato() {
    if(this.platoForm.valid){
      this.platoService.editPlatoUsuario(this.id, this.platoForm).subscribe({
        error: (e)=>{
          this.alertaPersonalizadaError("Error","Error al editar el Plato","Error" )
        },
        next: (n) =>{
          this.router.navigateByUrl('/misPlatos');
          this.alertaPersonalizadaOK("OK","Plato modificado correctamente","Confirm" )
          
        }
      });
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
