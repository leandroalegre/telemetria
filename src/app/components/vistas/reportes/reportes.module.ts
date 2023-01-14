import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { PorReferenteComponent } from './por-referente/por-referente.component';
import { PorPersonaComponent } from './por-persona/por-persona.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [ReportesComponent, PorReferenteComponent, PorPersonaComponent, UsuariosComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    MaterialModule
  ]
})
export class ReportesModule { }
