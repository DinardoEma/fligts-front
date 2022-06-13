import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-notrip',
  templateUrl: './reporte-notrip.component.html',
  styleUrls: ['./reporte-notrip.component.css']
})
export class ReporteNotripComponent implements OnInit {
  reporteAeronave =  false;
  pdfSrc: any;
  constructor() { }

  ngOnInit(): void {
  }

  generarReporteNotrip(){
    this.reporteAeronave = true;
    this.pdfSrc = 'https://opr-terrestres.herokuapp.com/v1/losilegales/reporte/aeronavesNoTripuladas';
  }
}
