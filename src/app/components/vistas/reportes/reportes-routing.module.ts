import { UsuariosComponent } from './usuarios/usuarios.component';
import { PorPersonaComponent } from './por-persona/por-persona.component';
import { ReferenteFiscalAdminGuard } from './../../guards/referente-fiscal-admin.guard';
import { CheckAdminGuard } from './../../guards/check-admin.guard';
import { PorReferenteComponent } from './por-referente/por-referente.component';
import { ReportesComponent } from './reportes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {canActivate:[ReferenteFiscalAdminGuard], path:'', component:ReportesComponent},
  {canActivate:[ReferenteFiscalAdminGuard] , path:'por-referente', component:PorReferenteComponent},
  {canActivate:[CheckAdminGuard], path:'por-persona', component:PorPersonaComponent},
  {canActivate:[CheckAdminGuard], path:'usuarios', component:UsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
