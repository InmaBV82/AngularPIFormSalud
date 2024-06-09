import { Component, OnInit, Renderer2  } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../modelos/Usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgStyle],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  usuario!: Usuario;
  emailValido = true;
  passwordValido = true;
  nombreRecuperarValido = true;
  emailRecuperarValido = true;

  constructor(
    private usuarioService: UsuariosService, 
    private fb: FormBuilder,
    private router: Router,
    private renderer: Renderer2
  ) { }

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
        user => {
          this.usuarioService.setUser(user);
          this.usuario = user;
          this.usuarioService.saveUserId(this.usuario.id);
          this.router.navigateByUrl('/perfil');
        },//manejo diferentes errores
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.alertaPersonalizadaError('Error', 'Usuario no registrado', 'error');
          } else if (error.status === 401) {
            this.alertaPersonalizadaError('Error', 'Contraseña incorrecta', 'error');
          } else {
            this.alertaPersonalizadaError('Error', 'Error desconocido', 'error');
          }
        }
      );
    } else {
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
      .subscribe({
        next: response => {
          this.alertaPersonalizadaOK('OK', 'Se le ha enviado un email con la nueva contraseña', 'Confirm!');
          this.cerrarModal();
        },
        error: error => {
          this.alertaPersonalizadaError('Error', 'Error al recuperar la contraseña', 'Error');
        }
      });
    } else {
      if (!this.recuperarPasswordForm.controls["nombre"].valid) {
        this.nombreRecuperarValido = false;
      }
      if (!this.recuperarPasswordForm.controls["email"].valid) {
        this.emailRecuperarValido = false;
      }
    }
  }

  cerrarModal() {
    const modal = this.renderer.selectRootElement('#recuperarPasswordModal', true);
    this.renderer.setProperty(modal, 'style', 'display: none');
    const backdrop = this.renderer.selectRootElement('.modal-backdrop', true);
    this.renderer.removeChild(document.body, backdrop);
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