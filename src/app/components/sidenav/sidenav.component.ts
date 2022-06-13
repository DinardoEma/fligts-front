import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ClimaDetalleComponent } from '../clima-detalle/clima-detalle.component';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
})
export class SidenavComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  isLoggedIn$: Observable<boolean> | undefined;
  user: string = '';
  id: number = 0;
  rol: number;
  rolTexto: string;
  fillerNav: any[] = [];
  flag: boolean;
  img$: Observable<string> | undefined;
  img: string = '../../../assets/lluvia.png';
  clase$: Observable<string> | undefined;
  clase = ''

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private authService: AuthService,
              private router : Router,
              private http: HttpClient,
              private dialog : MatDialog,
              private clima: ClimaService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  changeIcon(){
    if(document.querySelector('img') != null){
      const imagen = document.querySelector('img');
      imagen!.src = this.img;
    }
  }

  changeClass(){
    this.clase = this.clima.getClase();
  }

  acciones(){
    this.openDialog(this.clase);
  }
  

  openDialog(climaActual: any){
    const dialogRef = this.dialog.open(ClimaDetalleComponent, {
      width: '600px',
      data: {climaActual},
    });
  }
  suscribirme(){
    this.img$?.subscribe((response) => {
      this.img = response;
      this.changeIcon();
      this.changeClass();
    });
  }

  fillNav(){
    if(!this.flag){
      this.flag = !this.flag;
      if(this.rol === 1){
        this.fillerNav.push({name: "Usuarios", route:"main", icon:"home"});
        this.fillerNav.push({name: "Crear Usuario", route:"add", icon:"add"});
        this.fillerNav.push({name: "Perfil", route:"user", icon:"person"});
        this.fillerNav.push({name: "Historial Vuelo", route:"historial", icon:"flight"}); 
        this.fillerNav.push({name: "Reportes", route:"reporte-c", icon:"assignment"}); 
        this.fillerNav.push({name: "Carga", route:"carga", icon:"business_center"});
        this.fillerNav.push({name: "Dashboard", route:"dashboard", icon:"pie_chart"});
        this.fillerNav.push({name: "Comisariato", route:"comisariato", icon:"card_travel"});
        this.fillerNav.push({name: "Clima", route:"clima", icon:"cloud"});
      }
      if(this.rol === 2){
        this.fillerNav.push({name: "Perfil", route:"user", icon:"person"});
        this.fillerNav.push({name: "Carga", route:"carga", icon:"business_center"});
      }
      if(this.rol === 3){
        this.fillerNav.push({name: "Perfil", route:"user", icon:"person"});
      }
      if(this.rol === 4){
        this.fillerNav.push({name: "Perfil", route:"user", icon:"person"});
      }
      if(this.rol === 5){
        this.fillerNav.push({name: "Perfil", route:"user", icon:"person"});
        this.fillerNav.push({name: "Historial", route:"historial", icon:"flight"});
      }
    }
  }

  setRolTexto(data: string){
    this.rolTexto = data;
  }

  onUser(){
    this.router.navigate(['./user']);
  }
  
  setRol(data: number){
    this.rol = data;
    this.fillNav();
  }
  cargarUser(){
    this.user = this.authService.getCodUser();
    return this.user;
  }
  cargarID(){
    this.id = this.authService.getId();
    return this.id;
  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.img$ = this.clima.isImagen;
    this.suscribirme();
  }

  onLogout(){
    this.flag = false;
    this.fillerNav = [];
    this.user = '';
    this.authService.logout();                      
  }
}
