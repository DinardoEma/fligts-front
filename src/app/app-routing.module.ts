import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './components/add/add.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthGuard } from './services/auth.guard';
import { UserComponent } from './components/user/user.component';
import { CargaComponent } from './components/carga/carga.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HCustomComponent } from './components/h-custom/h-custom.component';
import { HConsumoComponent } from './components/h-consumo/h-consumo.component';
import { HHoraComponent } from './components/h-hora/h-hora.component';
import { HGeneralComponent } from './components/h-general/h-general.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComisariatoAccionesComponent } from './components/comisariato-acciones/comisariato-acciones.component';
import { ClimaComponent } from './components/clima/clima.component';
import { ManualComponent } from './components/manual/manual.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'fligths', component: SidenavComponent},
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'edit', component: EditComponent,canActivate: [AuthGuard]},
  { path: 'add', component: AddComponent,canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent,canActivate: [AuthGuard]},
  { path: 'carga', component: CargaComponent,canActivate: [AuthGuard]},
  { path: 'historial', component: HistorialComponent,canActivate: [AuthGuard]},
  { path: 'custom', component: HCustomComponent,canActivate: [AuthGuard]},
  { path: 'consumo', component: HConsumoComponent,canActivate: [AuthGuard]},
  { path: 'general', component: HGeneralComponent,canActivate: [AuthGuard]},
  { path: 'hora', component: HHoraComponent,canActivate: [AuthGuard]},
  { path: 'reporte-c', component: ReportesComponent,canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'comisariato', component: ComisariatoAccionesComponent,canActivate: [AuthGuard]},
  { path: 'clima', component: ClimaComponent,canActivate: [AuthGuard]},
  { path: 'manual', component: ManualComponent,canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
