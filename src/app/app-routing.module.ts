import { CheckLoginGuard } from './components/guards/check-login.guard';
import { CheckVistasGuard } from './components/guards/check-vistas.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full'},
   {canActivate:[CheckVistasGuard],  path: 'home', loadChildren: () => import('./components/vistas/home/home.module').then(m => m.HomeModule)},
   {canActivate:[CheckLoginGuard], path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule)},
   {canActivate:[CheckVistasGuard],path: 'reportes', loadChildren:()=> import('./components/vistas/reportes/reportes.module').then(m=>m.ReportesModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
