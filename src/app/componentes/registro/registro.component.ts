import { Component } from '@angular/core';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { NgIf, NgStyle } from '@angular/common';
import { Usuario } from '../../modelos/Usuario';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgStyle],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroForm !: FormGroup;


  nombreValido = true;
  emailValido = true;
  passwordValido = true;
  error=""
  mensaje=""

  constructor(
    private fb:FormBuilder,
    private route:Router, 
    private usuService:UsuariosService,
    ) {
    
  }

  usuNuevo!: Usuario

  ngOnInit(){
    this.registroForm = this.fb.group({
      nombre:["", [Validators.required]],
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}')]],

    }
    )
  }

  agregarUsuario() {
    this.nombreValido = true;
    this.emailValido = true;
    this.passwordValido = true;

    
    if(this.registroForm.valid){
      this.usuService.addUsuario(this.registroForm).subscribe({
        error: (e)=>{
          this.alertaPersonalizadaError("Error","Ya existe el correo electrónico","Error" )
          //alert("Ya existe el correo electrónico")
        },
        next: (e) =>{

          this.route.navigateByUrl('/login');
          this.alertaPersonalizadaOK("OK","Usuario registrado correctamente","Confirm" )
          
        }
      });
        
      }else{

        if (!this.registroForm.controls["nombre"].valid) {
          this.nombreValido = false;
        } 
        if(!this.registroForm.controls["email"].valid) {
          this.emailValido = false;
        }  
        if(!this.registroForm.controls["password"].valid) {
          this.passwordValido = false;
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


}
