import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

export interface Carga {
  codigo: number;
  pasajero: string;
  tipo: string;
  peso: number;
  tag: string;
}

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css'], 
})
export class CargaComponent implements OnInit {
  dataTable: any;
  color='primary';
  displayedColumns: String[];
  vuelo = new FormControl('', Validators.required);
  fecha: any;
  time = new FormControl('', Validators.required);
  selection = new SelectionModel<any>(true, []);
  eventoFecha: boolean = false;
  tabla: boolean = false;
  error: boolean = false;
  estado: boolean = false;
  urlBase = 'https://opr-terrestres.herokuapp.com/v1/losilegales/cargas/';
  
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(event != null){
      this.eventoFecha = true;
    } 
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['select', 'idCarga', 'codigoPasajero', 'tipo', 'peso', 'tag', 'estadoCarga'];
  }

  obtenerCargas(){
    let fechaReal = this.armarFecha();
    let hora = this.armarHora();
    let url = this.urlBase + this.vuelo.value;
    let url2 = url + '-' + fechaReal + hora;
    console.log(url2);
    this.http.get<any>(url2).subscribe((data) => {
      console.log(data);
      if(data.length > 0){
        if((data[0].estadoCarga.search('En espera')) === 0){
          this.estado = true;
        }
        else this.estado = false;
        this.dataTable = new MatTableDataSource(data);
        this.tabla = true;
      }
      else {
        this.tabla = false;
        this.error = true;
      }
    });
  }

  buscar(){
    this.error = false;
    this.obtenerCargas();
  }

  enviar(){
    const headers = { 'content-type': 'application/json'};
    let fechaReal = this.armarFecha();
    let hora = this.armarHora();
    let urlBaseEstado = 'https://opr-terrestres.herokuapp.com/v1/losilegales/carga/';
    let url = urlBaseEstado + this.vuelo.value + '-' + fechaReal + hora + '/Cargada';
    console.log(url);
    this.http.put(url, '', {headers: headers}).subscribe((data) => {
      if(data){
        alert("se cargo la carga con exito");
        this.masterToggle();
        this.tabla = false;
      }
    });
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

  armarHora(){
    let hora = '';
    let horaReal = '';
    hora = this.time.value;
    horaReal = hora.slice(0,2);
    horaReal = horaReal + hora.slice(3,5);
    return horaReal;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataTable.data.length;
    return numSelected === numRows;
  }

  estilo(estilo:string){
    if(estilo.match('peligroso')){
       return 'background: #F36B6B'; 
    }
    if(estilo.match('delicado')){
      return 'background: #8EDDFA';
    }
    if(estilo.match('animal')){
      return 'background: #E2B354'
    }
    return 'background: #67F688';
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataTable.data);
  }

  checkboxLabel(row?: Carga): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  
}
