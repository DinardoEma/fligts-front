import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface Carga {
  codigo: number;
  pasajero: string;
  tipo: string;
  peso: number;
  tag: string;
}

@Component({
  selector: 'app-comisariato-acciones',
  templateUrl: './comisariato-acciones.component.html',
  styleUrls: ['./comisariato-acciones.component.css']
})
export class ComisariatoAccionesComponent implements OnInit {
  spinner: boolean = false;
  insumos: FormGroup;
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
  errorInsumo: boolean = false;

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

  constructor(
    private http: HttpClient,
    private router: Router,
    fb: FormBuilder) { 
      this.insumos = fb.group({
        limpieza: false,
        verificacion: false,
        seguridad: false,
        bolsas: false,
      });
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

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(event != null){
      this.eventoFecha = true;
    } 
  }
  

  ngOnInit(): void {
    this.displayedColumns = ['select', 'Name', 'Type' , 'Description', ];
    this.allCargas();
  }

  obtenerCargas(selected: any){
    let url2: any;
    let url ='https://operaciones-mantenimiento.herokuapp.com/Insumo/Vuelo/allByVuelo/';
    if(selected){
      url2 = url + this.selectedVuelo + '-' + this.selectedFecha + this.selectedHora;
    }
    else{
      let fechaReal = this.armarFecha();
      let hora = this.armarHora();
      url + this.vuelo.value;
      url2 = url + '-' + fechaReal + hora;
    }
    let Insumo: string [] = [];
    this.http.get<any>(url2).subscribe((data) => {
      if(data.length > 0){
        data.forEach( (element : any) => {
          Insumo.push(element.Supply);
        });
        this.dataTable = new MatTableDataSource(Insumo);
        this.spinner = false;
        this.tabla = true;
      }
      else {
        this.spinner = false;
        this.tabla = false;
        this.error = true;
      }
    });
  }

  buscar(){
    this.spinner = true;
    this.error = false;
    this.obtenerCargas(false);
  }
  buscarSelect(){
    this.spinner = true;

    this.error = false;
    this.obtenerCargas(true);
  }
  enviar(){
    this.spinner = true;
    const headers = { 'content-type': 'application/json'};
    let body = this.armarBody();
    let url = 'https://opr-terrestres.herokuapp.com/v1/losilegales/comisariato';
    this.http.post(url, body, {headers: headers}).subscribe((data) => {
      if(data){
        this.spinner = false;
        alert("se cargo los insumos con exito");
        this.masterToggle();
        this.tabla = false;
      }
    },
    (error) => {
      if(error.error.message.match('ya existe')){
        this.spinner = false;
        this.tabla = false;
        this.errorInsumo = true;
      }
    }
    );
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

  cambiarClase(campo: any){
    if(this.insumos.get(campo)?.value){
      return 'check';
    }
    return 'nocheck';
  }

  armarBody(){
    let fechaReal = this.armarFecha();
    let hora = this.armarHora();
    let body = {
      "codigo" : this.vuelo.value + '-' + fechaReal + hora,
      "verificacionLimpieza" : this.insumos.get('limpieza')?.value,
      "verificacionInterna" : this.insumos.get('verificacion')?.value,
      "verificacionElementosSeguridad" : this.insumos.get('seguridad')?.value,
      "verificacionCartillasBolsas" : this.insumos.get('bolsas')?.value,
      "verificacionInsumos" : true,
    };
    return body;
  }

}
