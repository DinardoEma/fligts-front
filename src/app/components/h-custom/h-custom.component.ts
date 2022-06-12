import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DetalleComponent } from '../detalle/detalle.component';
import { HttpClient } from '@angular/common/http';
import { HistorialComponent } from '../historial/historial.component';


@Component({
  selector: 'app-h-custom',
  templateUrl: './h-custom.component.html',
  styleUrls: ['./h-custom.component.css']
})

export class  HCustomComponent implements OnInit {
  dataTable: any;
  table: FormGroup;
  selection = new SelectionModel<any>(true, []);
  columns: string[] = [];

  columns2: string[] = ['aeronave_matricula_fk', 'aeronavesposibles', 'checkin', 'climadestino', 
  'controlcabina', 'destinoreal_codiata', 'destinoteorico_codiata', 'diadespegue', 'duracionestimada',
  'duracionreal'];
  columns3: string[] = ['estado', 'fechadespegueestimado', 'fechaaterrizajereal', 'fechaaterrizajeestimado',
  'fechadespeguereal', 'gradostemperaturadestino', 'horaaterrizajeestimado', 'horaaterrizajereal',  
  'horadespegueestimado', 'horadespeguereal'];
  columns4: string[] = ['idvuelo', 'kilometrajeestimado', 'kilometrajereal', 'ltscombustibleestimado', 
  'ltscombustiblereal', 'lubricanteestimado', 'lubricantereal', 'modeloaeronave', 'motivoestado', 'nombrecompania'];
  columns5: string[] = ['origenreal_codiata', 'origenteorico_codiata', 'pesocargadestino', 
  'pesocargaorigen', 'regladevuelo', 'rutareal', 'rutateorica', 'tipodevuelo', 'totalpersonasabordo', 'velocidadvientokm'];

  displayedColumns: String[];
  
  constructor(
    private dialog: MatDialog,
    private historial: HistorialComponent,
    fb: FormBuilder) { 
    this.table = fb.group({
      aeronave_matricula_fk: false,
      aeronavesposibles: false,
      checkin: false,
      climadestino: false,
      controlcabina: false,
      destinoreal_codiata: false,
      destinoteorico_codiata: false,
      diadespegue: false,
      duracionestimada: false,
      duracionreal: false,
      estado: false,
      fechadespegueestimado: false,
      fechaaterrizajereal: false,
      fechaaterrizajeestimado: false,
      fechadespeguereal: false,
      gradostemperaturadestino: false,
      horaaterrizajeestimado: false,
      horaaterrizajereal: false,
      horadespegueestimado: false,
      horadespeguereal: false,
      idvuelo: false,
      kilometrajeestimado: false,
      kilometrajereal: false,
      ltscombustibleestimado: false,
      ltscombustiblereal: false,
      lubricanteestimado: false,
      lubricantereal: false,
      modeloaeronave: false,
      motivoestado: false,
      nombrecompania: false,
      origenreal_codiata: false,
      origenteorico_codiata: false,
      pesocargadestino: false,
      pesocargaorigen: false,
      regladevuelo: false,
      rutareal: false,
      rutateorica: false,
      tipodevuelo: false,
      totalpersonasabordo: false,
      velocidadvientokm: false,
    }); 
  }

  ngOnInit(): void {
    this.displayedColumns= this.columns;
    this.getHistorial();
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataTable.paginator = this.paginator;
  }
  cambiar(data: string){
    if(!this.table.get(data)?.value){
      this.columns.push(data);
    }
    else {
      let indice = this.columns.indexOf(data);
      this.columns.splice(indice,1);
    }
  }

  detalle(info : any){
    this.openDialog(info.idvuelo, info.aeronave_matricula_fk);
  }

  openDialog(idVuelo: any, idAeronave: any){
    const dialogRef = this.dialog.open(DetalleComponent, {
      width: '800px',
      data: {idVuelo, idAeronave},
    });
  }

  getHistorial(){
    let historico:any = this.historial.getHistorial();
    if(historico != null){
      this.dataTable = new MatTableDataSource(historico);
    }
  }
}
