import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NwpassComponent } from './nwpass/nwpass.component';


@NgModule({
  declarations: [LoginComponent, NwpassComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
