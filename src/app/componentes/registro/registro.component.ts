import { Component } from '@angular/core';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { NgIf, NgStyle } from '@angular/common';
import { Usuario } from '../../modelos/Usuario';


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
      password:["",[Validators.required]],

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
          alert("Ya existe el correo electrónico")
        },
        next: (e) =>{
          alert("usuario registrado")
          this.route.navigateByUrl('/login');
          
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

}
