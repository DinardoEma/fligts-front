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



  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(event != null){
      this.eventoFecha = true;
    } 
  }
  

  ngOnInit(): void {
    this.displayedColumns = ['select', 'Name', 'Type' , 'Description', ];
  }

  obtenerCargas(){
    let fechaReal = this.armarFecha();
    let hora = this.armarHora();
    let url =  'https://operaciones-mantenimiento.herokuapp.com/Insumo/Vuelo/allByVuelo/' + this.vuelo.value;
    let url2 = url + '-' + fechaReal + hora;
    console.log(url2);
    let Insumo: string [] = [];
    this.http.get<any>(url2).subscribe((data) => {
      console.log(data);
      if(data.length > 0){
        data.forEach( (element : any) => {
          Insumo.push(element.Supply);
        });
        this.dataTable = new MatTableDataSource(Insumo);
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
    let body = this.armarBody();
    let url = 'https://opr-terrestres.herokuapp.com/v1/losilegales/comisariato';
    this.http.post(url, body, {headers: headers}).subscribe((data) => {
      if(data){
        alert("se cargo los insumos con exito");
        this.masterToggle();
        this.tabla = false;
      }
    },
    (error) => {
      if(error.error.message.match('ya existe')){
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
