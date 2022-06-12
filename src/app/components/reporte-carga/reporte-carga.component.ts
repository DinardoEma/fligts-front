import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-reporte-carga',
  templateUrl: './reporte-carga.component.html',
  styleUrls: ['./reporte-carga.component.css']
})
export class ReporteCargaComponent implements OnInit {
  fecha: any;
  pdfSrc: any;
  reporte = false;
  reporteVuelo = false;
  reporteFecha = false;
  eventoFecha: boolean = false;
  vuelo = new FormControl('', Validators.required);
  time = new FormControl('', Validators.required);
  urlBase = 'https://opr-terrestres.herokuapp.com/v1/losilegales/report/carga/';
  constructor() { }

  ngOnInit(): void {
  }
  generarReporte(){
    console.log("Reporte");
    this.reporte = true;
    this.reporteVuelo = false;
    this.reporteFecha = false;
    let fecha = this.armarFechaGuion();
    let hora = this.time.value;
    let url = this.urlBase + this.vuelo.value + '/' + fecha + ' ' + hora;
    console.log(url);
    this.pdfSrc = url;
  }
  esconderReporte(){
    this.reporte = false;
  }
  generarReporteVuelo(){
    console.log("Reporte Vuelo");
    this.reporteVuelo = true;
    this.reporteFecha = false;
    this.reporte = false;
    let fecha = this.armarFecha();
    let hora = this.armarHora();
    let url = this.urlBase + this.vuelo.value + '-' + fecha + hora;
    console.log(url);
    this.pdfSrc = url;
  }
  esconderReporteVuelo(){
    this.reporteVuelo = false;
  }
  generarReporteFecha(){
    console.log("Reporte Fecha");
    this.reporteFecha = true;
    this.reporteVuelo = false;
    this.reporte = false;
    let fecha = this.armarFechaGuion();
    let hora = this.time.value;
    let url = this.urlBase + 'fecha/' + fecha + ' ' + hora;
    console.log(url);
    this.pdfSrc = url;
    
  }
  esconderReporteFecha(){
    this.reporteFecha = false;
  }
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(event != null){
      this.eventoFecha = true;
    } 
  }

  armarFecha(){
    let fechaReal = '';
    fechaReal = fechaReal + this.fecha.getFullYear();
    if((this.fecha.getMonth()+1) < 10){
      fechaReal = fechaReal + '0' + (this.fecha.getMonth() + 1);
    }
    else fechaReal = fechaReal + (this.fecha.getMonth() + 1);
    if(this.fecha.getDate() < 10){
      fechaReal = fechaReal + '0' + this.fecha.getDate();
    }
    else fechaReal = fechaReal + this.fecha.getDate();
    return fechaReal;
  }

  armarFechaGuion(){
    let fechaReal = '';
    fechaReal = fechaReal + this.fecha.getFullYear();
    fechaReal = fechaReal + '-';
    if((this.fecha.getMonth()+1) < 10){
      fechaReal = fechaReal + '0' + (this.fecha.getMonth() + 1);
      fechaReal = fechaReal + '-';
    }
    else fechaReal = fechaReal + (this.fecha.getMonth() + 1);
    if(this.fecha.getDate() < 10){
      fechaReal = fechaReal + '0' + this.fecha.getDate();
    }
    else fechaReal = fechaReal + this.fecha.getDate();
    return fechaReal;
  }

  armarHora(){
    let hora = '';
    let horaReal = '';
    hora = this.time.value;
    horaReal = hora.slice(0,2);
    horaReal = horaReal + hora.slice(3,5);
    return horaReal;
  }
}
