import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  historial: any;
  selected = 'Ninguno';
  historiales: any[] = ['Ninguno', 'Personalizado', 'Hora', 'Consumo', 'General'];
  constructor( private http : HttpClient
  ) { }

  ngOnInit(): void {
    this.getHistorico();
  }

  getHistorico(){
    let url = ' https://proyecto-icarus.herokuapp.com/vuelos';
    this.http.get<any>(url).subscribe( (response) => {
      this.armarHistorial(response);
    });
  }

  armarHistorial(data:any){
    let Historial2: { estado: string; }[] = [];
    data.forEach((element: { estado: string; }) => {
      if(element.estado.match('finalizado')){
        Historial2.push(element);
      }
    });
    this.historial = Historial2;
  }
  
  getHistorial(){
    return this.historial;
  }
}
