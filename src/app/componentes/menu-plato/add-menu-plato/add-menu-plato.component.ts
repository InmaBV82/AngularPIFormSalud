import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tipo } from '../../../modelos/Tipo';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TiposService } from '../../../servicios/tipos.service';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { MenuService } from '../../../servicios/menu.service';
import { PlatoDTO } from '../../../modelos/PlatoDTO';
import { MenuDTO } from '../../../modelos/MenuDTO';
import { PlatoService } from '../../../servicios/plato.service';
import { MenuPlatoService } from '../../../servicios/menu-plato.service';

@Component({
  selector: 'app-add-menu-plato',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule],
  templateUrl: './add-menu-plato.component.html',
  styleUrl: './add-menu-plato.component.css'
})
export class AddMenuPlatoComponent implements OnInit{

  usuarioId!: number
  tipos: Tipo[]=[];
  platos: PlatoDTO[]=[];
  menus: MenuDTO[]=[];
  menuForm!: FormGroup;
  menuPlatoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tipoService: TiposService,
    private router: Router,
    private menuService: MenuService,
    private usuarioService: UsuariosService,
    private platoService: PlatoService,
    private menuPlatoService: MenuPlatoService
  ) {
    this.menuForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    tipoid:  ['', Validators.required]

  });

  this.menuPlatoForm = this.formBuilder.group({
    platoid: ['', Validators.required],
    idMenu:  ['', Validators.required],
    momento: ['', Validators.required]

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
    this.cargarTipos();
    this.cargarPlatos();
    this.cargarMenus();
  }


  agregarMenu() {
    if(this.menuForm.valid){
      this.menuService.crearMenu(this.menuForm).subscribe({
        error: (e)=>{
          console.error("Error al crear el Menú" )
        },
        next: (n) =>{
          console.log("Menú creado" )
        //para actualizar el form del menu y que aparezca en el desplegable del menuplato
          location.reload()
          
        }
      });
      }
  }

  agregarMenuPlato() {
    if(this.menuPlatoForm.valid){
      this.menuPlatoService.crearMenuPlato(this.menuPlatoForm).subscribe({
        error: (e)=>{
          console.error("Error al crear el Menú Diseñado" )
        },
        next: (n) =>{
          this.router.navigateByUrl('/menuplatos');
          console.log("Menú Diseñado" )
          
        }
      });
      }
  }


cargarTipos(): void {
  this.tipoService.obtenerTipos().subscribe({
    next: (data: Tipo[]) => {
      this.tipos = data;
    },
    error: (err) => console.error('Error al cargar tipos', err)
  });
}

cargarMenus(): void {
  this.menuService.obtenerMenus().subscribe({
    next: (data: MenuDTO[]) => {
      this.menus = data;
    },
    error: (err) => console.error('Error al cargar menus', err)
  });
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
  this.router.navigate(['/menuplatos']);
  }


}