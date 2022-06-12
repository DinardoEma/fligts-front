import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DetalleComponent } from '../detalle/detalle.component';
import { HttpClient } from '@angular/common/http';
import { HistorialComponent } from '../historial/historial.component';

@Component({
  selector: 'app-h-consumo',
  templateUrl: './h-consumo.component.html',
  styleUrls: ['./h-consumo.component.css']
})
export class HConsumoComponent implements OnInit {
  dataTable: any;
  displayedColumns: string[] = ['idvuelo', 'aeronave_matricula_fk', 'nombrecompania', 'estado', 
  'rutateorica', 'ltscombustibleestimado',
'ltscombustiblereal', 'lubricanteestimado', 'lubricantereal', 'kilometrajeestimado', 'kilometrajereal'];
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private historial: HistorialComponent,
  ) { }

  ngOnInit(): void {
    this.getHistorial();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataTable.paginator = this.paginator;
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
