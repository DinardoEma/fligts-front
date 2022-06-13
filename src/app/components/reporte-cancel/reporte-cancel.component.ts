import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-cancel',
  templateUrl: './reporte-cancel.component.html',
  styleUrls: ['./reporte-cancel.component.css']
})
export class ReporteCancelComponent implements OnInit {
  reporteAeronave =  false;
  pdfSrc: any;
  constructor() { }

  ngOnInit(): void {
  }

  generarReporteCancel(){
    this.reporteAeronave = true;
    this.pdfSrc = 'https://opr-terrestres.herokuapp.com/v1/losilegales/reporte/vuelosCancelados';
  }

}
