import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reporte: any;
  selected = 'Ninguno';
  reportes: any[] = ['Ninguno', 'Cargas', 'Aeronaves', 'No tripulados', 'Cancelados'];
  constructor() { }

  ngOnInit(): void {
  }

}
