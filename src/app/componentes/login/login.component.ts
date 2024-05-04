import { Component, OnInit } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../modelos/Usuario';


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
    private route: Router,
    private fb: FormBuilder,
  
  ) { }

  usuarios !: Usuario[];

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
      this.usuarioService.login(this.formLogin.value.email, this.formLogin.value.password)
    }
    

  }

}
