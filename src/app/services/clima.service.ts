import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClimaService{
  private imagen = new BehaviorSubject<any>("");
  clase: any = '';
  climaActual: any;
  codigoClima: number;
  lat: any;
  lon: any;
  imagenSol = '../../../assets/clima/sun.png';
  imagenNube = '../../../assets/clima/cloud.png';
  imagenNeblina = '../../../assets/clima/fog.png';
  imagenLluvia = '../../../assets/clima/rain.png';
  imagenTormenta = '../../../assets/clima/tormenta.png';
  imagenNieve = '../../../assets/clima/snow.png';
  imagenLlovizna = '../../../assets/clima/little_rain.png';
  mail = "dinardoema@gmail.com";

  constructor(
    private http: HttpClient
    ) { 
    }


  get isImagen(){
    return this.imagen.asObservable();
  }

  setClase(data: any){
    this.clase = data;
  }

  getClase(){
    return this.clase;
  }
  setImagen(data: any){
    this.imagen.next(data);
  }

  getCoordenadas(aeropuerto: any){
    let queryparams = new HttpParams();
    queryparams = queryparams.append("iata", aeropuerto);
    this.http.get<any>('https://grops-backend-dnj2km2huq-rj.a.run.app/airport/getByIata', {params: queryparams})
    .subscribe(
      (response) => {
        this.lat = response.lat;
        this.lon = response.lon;
        this.getClima();
    });
  }

  getClima(){
    let queryparams = new HttpParams();
    queryparams = queryparams.append("current_weather", true);
    queryparams = queryparams.append("latitude",this.lat);
    queryparams = queryparams.append("longitude",this.lon);
    queryparams = queryparams.append("timezone", 'America/Sao_Paulo');
    this.http.get<any>('https://api.open-meteo.com/v1/forecast', {params: queryparams})
      .subscribe( (response) => {
        this.codigoClima = response.current_weather.weathercode;
        this.climaActualToTexto();
      });
  }

  enviarMail(clima: any){
    //console.log("enviar el mail por clima: " + clima);
    //descomentar para la presentacion final
    const headers = { 'content-type': 'application/json'};
    let url = 'https://opr-terrestres.herokuapp.com/v1/losilegales/email';
    let body = {
      "to" : this.mail,
      "subject" : "Notificación clima: " + clima,
      "content" : "Seguir las indicaciones por clima: " + clima,
    }
    this.http.post(url, body , {headers: headers}).subscribe( ( response) => {
      console.log(response);
    });
  }

  sol(){
    this.climaActual = 'soleado';
    this.setClase('soleado');
    this.setImagen(this.imagenSol);
    this.enviarMail(this.climaActual);
  }
  nublado(){
    this.climaActual = 'nublado';
    this.setClase('nublado');
    this.setImagen(this.imagenNube);
    this.enviarMail(this.climaActual);
  }
  neblina(){
    this.climaActual = 'neblina';
    this.setClase('neblina');
    this.setImagen(this.imagenNeblina);
    this.enviarMail(this.climaActual);
  }
  lluvia(){
    this.climaActual = 'Lluvia';
    this.setClase('lluvia');
    this.setImagen(this.imagenLluvia);
    this.enviarMail(this.climaActual);
  }
  nevado(){
    this.climaActual = 'nevado';
    this.setClase('nevado');
    this.setImagen(this.imagenNieve);
    this.enviarMail(this.climaActual);
  }
  tormentaElectrica(){
    this.climaActual = 'Tormenta Electrica';
    this.setClase('Tormenta-Electrica');
    this.setImagen(this.imagenTormenta);
    this.enviarMail(this.climaActual);
  }
  climaActualToTexto( ){
    switch (this.codigoClima) {
      case 0:
        this.sol();
        break;

      case 1:
        this.sol();
        break;

      case 2:
        this.sol();
        break;

      case 3:
        this.nublado();
        break;      

      case 45:
        this.neblina();
        break;

      case 48:
        this.neblina();
        break;


      case 51:
        this.lluvia();
        break;

      case 53:
        this.lluvia();
        break;  

      case 55:
        this.lluvia();
        break; 

      case 56:
        this.lluvia();
        break;

      case 57:
        this.lluvia();
        break;

      case 61:
        this.lluvia();
        break;

      case 63:
        this.lluvia();
        break;  

      case 65:
        this.lluvia();
        break; 

      case 66:
        this.lluvia();
        break;

      case 67:
        this.lluvia();
        break;

      case 71:
        this.nevado();
        break;

      case 73:
        this.nevado();
        break;  

      case 75:
        this.nevado();
        break; 

      case 77:
        this.nevado();
        break;

      case 80:
        this.lluvia();
        break;

      case 81:
        this.lluvia();
        break;   

      case 82:
        this.lluvia();
        break;

      case 85:
        this.nevado();
        break;

      case 86:
        this.nevado();
        break;

      case 95:
        this.tormentaElectrica();
        break;

      case 96:
        this.tormentaElectrica();
        break;  

      case 99:
        this.tormentaElectrica();
        break;
        
      default: 
        this.sol();
        break;  
    }

  }
}
