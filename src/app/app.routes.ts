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
import { AddHistoricoComponent } from './componentes/historico/add-historico/add-historico/add-historico.component';
import { AddPlatoComponent } from './componentes/plato/add-plato/add-plato/add-plato.component';
import { ListPlatosUsu } from './componentes/plato/list-platos-usu/list-platos-usu.component';
import { EditHistoricoComponent } from './componentes/historico/edit-historico/edit-historico.component';
import { EditPlatoComponent } from './componentes/plato/edit-plato/edit-plato.component';
import { AddResenaComponent } from './componentes/resena/add-resena/add-resena/add-resena.component';
import { EditResenaComponent } from './componentes/resena/edit-resena/edit-resena.component';
import { TodasResenasAdminComponent } from './componentes/resena/todas-resenas-admin/todas-resenas-admin.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent },
    { path: 'perfil', component: PerfilComponent},
    { path: 'tipos', component: TiposComponent},
    { path: 'ajustes', component: AjustesComponent},
    { path: 'historico', component: HistoricoComponent},
    { path: 'menuplatos', component: MenuPlatoComponent},
    { path: 'detalle-plato/:platoid', component: PlatoComponent},
    { path: 'addHistorico', component: AddHistoricoComponent},
    { path: 'editHistorico/:id', component: EditHistoricoComponent },
    { path: 'misPlatos', component: ListPlatosUsu},
    { path: 'addPlato', component: AddPlatoComponent},
    { path: 'editPlato/:id', component: EditPlatoComponent},
    { path: 'addResena/:platoid', component: AddResenaComponent},
    { path: 'editResena/:id', component: EditResenaComponent},
    { path: 'todasResenas', component: TodasResenasAdminComponent},
    { path : '**', component: InicioComponent},
];
