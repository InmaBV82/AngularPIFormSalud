import { Component, OnInit } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../modelos/Usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgStyle],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(
    private usuarioService: UsuariosService, 
    private fb: FormBuilder,
    private router: Router
  
  ) { }


  usuario !: Usuario

  emailValido = true;
  passwordValido = true;

  formLogin: FormGroup=this.fb.group({
    email: '',
    password: ''

  });

  ngOnInit(){
    this.formLogin = this.fb.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required]],
    }
    )
  }


  hacerLogin() {
    if(this.formLogin.valid){
      this.usuarioService.loginUsuario(this.formLogin.value).subscribe(
        user =>{
          if(user != null){
            this.usuario = user
            this.usuarioService.saveUserId(this.usuario.id)
            this.router.navigateByUrl('/perfil');
          }
          else{
            this.alertaPersonalizadaError('Error','Email no registrado', 'error')
          }
        }

      )
    } 
    else{
      if(!this.formLogin.controls["email"].valid) {
        this.emailValido = false;
      }  
      if(!this.formLogin.controls["password"].valid) {
      }

    }
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