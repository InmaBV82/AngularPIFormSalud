import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from '../app/componentes/registro/registro.component';
import { PerfilComponent } from '../app/componentes/perfil/perfil.component';
import { TiposComponent } from '../app/componentes/tipos/tipos.component';
import { AjustesComponent } from './componentes/ajustes/ajustes.component';
import { HistoricoComponent } from './componentes/historico/historico.component';
import { MenuPlatoComponent } from './componentes/menu-plato/menu-plato.component';
import { PlatoComponent } from './componentes/plato/plato.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent },
    { path: 'perfil', component: PerfilComponent},
    { path: 'tipos', component: TiposComponent},
    { path: 'ajustes', component: AjustesComponent},
    { path: 'historico', component: HistoricoComponent},
    { path: 'menuplatos', component: MenuPlatoComponent},
    { path: 'detalle-plato/:platoid', component: PlatoComponent},
    { path : '**', component: InicioComponent},
];
