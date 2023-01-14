import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { MaterialModule } from './../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresarVotosComponent } from './ingresar-votos/ingresar-votos.component';


@NgModule({
  declarations: [HomeComponent, PanelControlComponent, IngresarVotosComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
