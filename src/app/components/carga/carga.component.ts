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
  spinner: boolean = false;
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
  errorReal: boolean = false;
  errorModulo: boolean = false;
  urlBase = 'https://opr-terrestres.herokuapp.com/v1/losilegales/cargas/';
  
  codigos: string[] = [];
  codigosVuelos: string[] = [];
  fechas: string[] = [];
  hora: string[] = [];
  selectedVuelo: any;
  selectedFecha: any;
  selectedHora: any;
  selectedSeleccion = 'Sistema';
  seleccion: string[] = ['Manual', 'Sistema'];

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
    this.allCargas();
  }

  selectClick(data:any){
    this.codigosVuelos.forEach((element:any, index: any) => {
      if(element.match(data)){
        this.selectedFecha = this.fechas[index];
        this.selectedHora = this.hora[index];
      }
    });
  }

  allCargas(){
    let url = 'https://opr-terrestres.herokuapp.com/v1/losilegales/cargas';
    this.http.get<any>(url).subscribe( (response) => {
      response.forEach((element : any) => {
        if(this.codigoExiste(element.codigo)){
        }
        else this.codigos.push(element.codigo);
      });
      this.armarSelects(this.codigos);
    });
  }

  codigoExiste(data: any){
    let existe = false;
    this.codigos.forEach(element => {
      if(element.match(data)){
        existe = true;
      }
    });
    return existe;
  }

  armarSelects(data: any){
    data.forEach((element:any) => {
      let vuelo2 = element.split('-');
      let codigoVuelo = vuelo2[0];
      let fechaCompleta = vuelo2[1];
      let fecha = fechaCompleta.slice(0,8);
      let hora = fechaCompleta.slice(8);
      this.codigosVuelos.push(codigoVuelo);
      this.fechas.push(fecha);
      this.hora.push(hora);
    });
  }




  obtenerCargas(select: any){
    let url2: any;
    if(select){
      url2 = this.urlBase + this.selectedVuelo + '-' + this.selectedFecha + this.selectedHora;
    }
    else {
      let fechaReal = this.armarFecha();
      let hora = this.armarHora();
      let url = this.urlBase + this.vuelo.value;
      url2 = url + '-' + fechaReal + hora;
    }
    this.http.get<any>(url2).subscribe((data) => {
      console.log(data);
      if(data.length > 0){
        if((data[0].estadoCarga.search('En espera')) === 0){
          this.estado = true;
        }
        else this.estado = false;
        this.dataTable = new MatTableDataSource(data);
        this.spinner = false;
        this.tabla = true;
      }
      else {
        this.tabla = false;
        this.error = true;
      }
    },
    err=> {
      if(err != null){
        if(err.error.message.match("peso")){
          this.spinner = false;
          this.tabla = false;
          this.errorModulo = true;
        }
        else {
          this.spinner = false;
          this.tabla = false;
          this.errorReal = true;
        }
      }
    });
  }

  buscar(){
    this.spinner = true;
    this.errorReal = false;
    this.errorModulo = false;
    this.error = false;
    this.obtenerCargas(false);
  }

  buscarSelect(){
    this.spinner = true;
    this.errorReal = false;
    this.errorModulo = false;
    this.error = false;
    this.obtenerCargas(true);
  }

  enviar(){
    this.spinner = true;
    const headers = { 'content-type': 'application/json'};
    let fechaReal = this.armarFecha();
    let hora = this.armarHora();
    let urlBaseEstado = 'https://opr-terrestres.herokuapp.com/v1/losilegales/carga/';
    let url = urlBaseEstado + this.vuelo.value + '-' + fechaReal + hora + '/Cargada';
    console.log(url);
    this.http.put(url, '', {headers: headers}).subscribe((data) => {
      if(data){
        this.spinner = false;
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
