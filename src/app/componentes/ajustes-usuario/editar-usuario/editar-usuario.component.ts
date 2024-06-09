import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../modelos/Usuario';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit{
  usuarioId!: number;
  usuario!: Usuario | undefined
  editarForm!: FormGroup

  
  nombreValido = true;
  emailValido = true;
  passwordValido = true;

  constructor(
    private usuarioService: UsuariosService,
    private router: Router,
    private formBuilder: FormBuilder,
  ){

  }

  ngOnInit(): void {
    let session=sessionStorage.getItem('userId')
      
    if(session != null){
      this.usuarioId = Number (session);
    }else{
      this.router.navigateByUrl("/inicio")
    }
    if (this.usuarioId) {
      this.usuarioService.getUnUsuario(this.usuarioId).subscribe({
        next: (data: Usuario) => {
          // se utiliza para asignar valores a un formulario reactivo en Angular
          this.editarForm.patchValue(data);
          // Ahora que el formulario está inicializado no da error de undefined=>usuarioId
        },
        error: (err) => {
          console.error('Error al obtener el usuario', err);
        }
      });
    }

    this.editarForm = this.formBuilder.group({
      nombre:["", [Validators.required]],
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,75}')]],

    }
    )
  }

  guardarCambios(){
    if(this.editarForm.valid){
      this.usuarioService.editarUsuario(this.usuarioId, this.editarForm).subscribe({
        error: (e)=>{
          this.alertaPersonalizadaError("Error","Error al editar el Usuario","Error" )
        },
        next: (n) =>{
          this.router.navigateByUrl('/perfil');
          this.alertaPersonalizadaOK("OK","Usuario modificado correctamente","Confirm" )
          
        }
      });
    }

  }

  volver() {
    this.router.navigateByUrl('/ajustes');
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