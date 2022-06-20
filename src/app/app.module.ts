import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ObjToArrayPipe } from './components/pipes/ObjToArray.pipe';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './components/add/add.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { RegistroVueloComponent } from './components/registro-vuelo/registro-vuelo.component';
import { UserComponent } from './components/user/user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HistorialComponent } from './components/historial/historial.component';
import { CargaComponent } from './components/carga/carga.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTree, MatTreeModule} from '@angular/material/tree';
import { HGeneralComponent } from './components/h-general/h-general.component';
import { HHoraComponent } from './components/h-hora/h-hora.component';
import { HConsumoComponent } from './components/h-consumo/h-consumo.component';
import { HCustomComponent } from './components/h-custom/h-custom.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReporteCargaComponent } from './components/reporte-carga/reporte-carga.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { ComisariatoComponent } from './components/comisariato/comisariato.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ComisariatoAccionesComponent } from './components/comisariato-acciones/comisariato-acciones.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReporteAeronaveComponent } from './components/reporte-aeronave/reporte-aeronave.component';
import { ClimaComponent } from './components/clima/clima.component';
import { ClimaDetalleComponent } from './components/clima-detalle/clima-detalle.component';
import { ClimaService } from './services/clima.service';
import { ReporteNotripComponent } from './components/reporte-notrip/reporte-notrip.component';
import { ReporteCancelComponent } from './components/reporte-cancel/reporte-cancel.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ManualComponent } from './components/manual/manual.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ObjToArrayPipe,
    EditComponent,
    AddComponent,
    SidenavComponent,
    RegistroVueloComponent,
    UserComponent,
    HistorialComponent,
    CargaComponent,
    HGeneralComponent,
    HHoraComponent,
    HConsumoComponent,
    HCustomComponent,
    ReporteCargaComponent,
    DashboardComponent,
    DetalleComponent,
    ComisariatoComponent,
    ComisariatoAccionesComponent,
    ReportesComponent,
    ReporteAeronaveComponent,
    ClimaComponent,
    ClimaDetalleComponent,
    ReporteNotripComponent,
    ReporteCancelComponent,
    ManualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTreeModule,
    PdfViewerModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  providers: [AuthService, AuthGuard, ClimaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
