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

  usuario!: Usuario;

  emailValido = true;
  passwordValido = true;

  nombreRecuperarValido = true;
  emailRecuperarValido = true;

  formLogin: FormGroup=this.fb.group({
    email: '',
    password: ''

  });

  recuperarPasswordForm: FormGroup=this.fb.group({
    nombre: '',
    email:''
  })


  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
    this.recuperarPasswordForm = this.fb.group({
      nombre: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]]
    });
  }

  hacerLogin() {
    if(this.formLogin.valid){
      this.usuarioService.loginUsuario(this.formLogin.value).subscribe(
        user =>{
          if(user != null){
            this.usuarioService.setUser(user)
            this.usuario = user
            this.usuarioService.saveUserId(this.usuario.id)
            this.router.navigateByUrl('/perfil');
          }
          else{
            this.alertaPersonalizadaError('Error','Datos Incorrectos', 'error')
          }
        }

      )
    } 
    else{
      if(!this.formLogin.controls["email"].valid) {
        this.emailValido = false;
      }  
      if(!this.formLogin.controls["password"].valid) {
        this.passwordValido = false;
      }

    }
  }

  recuperarPassword() {
    if (this.recuperarPasswordForm.valid) {
      const nombre = this.recuperarPasswordForm.get('nombre')?.value;
      const email = this.recuperarPasswordForm.get('email')?.value;

      this.usuarioService.recuperarPassword(nombre, email)
        .subscribe(
          response => {
            this.alertaPersonalizadaOK('OK', 'Se le ha enviado un email con la nueva contraseña', 'Confirm!');
          },
          error => {
            this.alertaPersonalizadaError('Error', 'Error al recuperar la contraseña', 'Error');
          }
        );
    } else {
      if (!this.recuperarPasswordForm.controls["nombre"].valid) {
        this.nombreRecuperarValido = false;
      }
      if (!this.recuperarPasswordForm.controls["email"].valid) {
        this.emailRecuperarValido = false;
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

  alertaPersonalizadaOK(title:string, text:string, confirmButtonText:string){
    Swal.fire({
      title:title,
      text: text,
      icon: 'success',
      confirmButtonText:confirmButtonText
    });
  }

  

}