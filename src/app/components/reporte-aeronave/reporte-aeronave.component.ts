import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-reporte-aeronave',
  templateUrl: './reporte-aeronave.component.html',
  styleUrls: ['./reporte-aeronave.component.css']
})
export class ReporteAeronaveComponent implements OnInit {
  spinner: boolean = false;
  reporteAeronave =  false;
  pdfSrc: any;
  download: 'https://opr-terrestres.herokuapp.com/v1/losilegales/reporte/topAeronaves';
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  generarReporteAeronave(){
    this.reporteAeronave = true;
    this.pdfSrc = 'https://opr-terrestres.herokuapp.com/v1/losilegales/reporte/topAeronaves';
  }

  descargarReporteAeronave(){
    console.log("descargar");
    /*let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    let url = 'https://opr-terrestres.herokuapp.com/v1/losilegales/reporte/topAeronaves';
    return this.http.get(url, { headers: headers, responseType: 'blob' });*/
  }

}
