import { AdminOperadorGuard } from './../../guards/admin-operador.guard';
import { NoIngresaVotoGuard } from './../../guards/no-ingresa-voto.guard';
import { IngresarVotosComponent } from './ingresar-votos/ingresar-votos.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { CheckAdminGuard } from '../../guards/check-admin.guard';

const routes: Routes = [
  { canActivate:[AdminOperadorGuard],path: 'panel',  component: PanelControlComponent},
   {canActivate:[CheckAdminGuard], path: '', component:HomeComponent},
   {canActivate:[NoIngresaVotoGuard], path: 'ingresar-votos', component:IngresarVotosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
