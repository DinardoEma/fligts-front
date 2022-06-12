import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ComisariatoComponent } from '../comisariato/comisariato.component';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  idVuelo: string;
  idAeronave: string;
}


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  mantenimientoAeronave: any;
  constructor(
        public dialogRef: MatDialogRef<DetalleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private http: HttpClient,
        private dialog : MatDialog,
  ) { 
    this.mantenimiento(data.idAeronave);
  }

  ngOnInit(): void {
  }

  mantenimiento(matricula:any){
    let urlBase = 'https://operaciones-mantenimiento.herokuapp.com/Mantenimientos/allByAeronave/';
    let url = urlBase + matricula;
    this.http.get<any>(url).subscribe( (response) => {
      console.log(response);
      this.mantenimientoAeronave = response.Approved;
    });
  }

  estilo(data:any){
    if(data){
      return 'container';
    }
    else return 'containerRechazado';
  }

  ok(){
    this.dialogRef.close();
  }

  comisariato(){
    this.openDialog(this.data.idVuelo, this.data.idAeronave);
  }

  openDialog(idVuelo: any, idAeronave: any){
    const dialogRef = this.dialog.open(ComisariatoComponent, {
      width: '600px',
      data: {idVuelo, idAeronave},
    });
  }
}
