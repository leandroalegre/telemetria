import { NwpassComponent } from './nwpass/nwpass.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', outlet: 'outlet1', component: LoginComponent },
  { path: 'nwpass',  component: NwpassComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
