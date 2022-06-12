import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-aeronave',
  templateUrl: './reporte-aeronave.component.html',
  styleUrls: ['./reporte-aeronave.component.css']
})
export class ReporteAeronaveComponent implements OnInit {
  reporteAeronave =  false;
  pdfSrc: any;
  constructor() { }

  ngOnInit(): void {
  }

  generarReporteAeronave(){
    this.reporteAeronave = true;
    this.pdfSrc = 'https://opr-terrestres.herokuapp.com/v1/losilegales/reporte/topAeronaves';
  }

}
