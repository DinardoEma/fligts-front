import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {
  climaActual: any;
  aeropuerto: any;
  
  constructor(
    private service : AuthService,
    private http: HttpClient,
    private climaService: ClimaService
  ) { }

  ngOnInit(): void {
    this.aeropuerto = this.service.getIata();
    this.climaActual = this.climaService.getClase();
  }

  sol(){
    this.climaService.sol();
    this.climaActual = this.climaService.getClase();
  }
  nublado(){
    this.climaService.nublado();
    this.climaActual = this.climaService.getClase();
  }
  neblina(){
    this.climaService.neblina();
    this.climaActual = this.climaService.getClase();
  }
  lluvia(){
    this.climaService.lluvia();
    this.climaActual = this.climaService.getClase();
  }
  nevado(){
    this.climaService.nevado();
    this.climaActual = this.climaService.getClase();
  }
  tormentaElectrica(){
    this.climaService.tormentaElectrica();
    this.climaActual = this.climaService.getClase();
  }


}
