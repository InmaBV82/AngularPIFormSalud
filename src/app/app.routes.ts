import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from '../app/componentes/registro/registro.component';
import { PerfilComponent } from '../app/componentes/perfil/perfil.component';
import { TiposComponent } from '../app/componentes/tipos/tipos.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path:'registro', component: RegistroComponent },
    { path: 'perfil', component: PerfilComponent},
    { path: 'tipos', component: TiposComponent},
    { path : '**', component: InicioComponent},
];
