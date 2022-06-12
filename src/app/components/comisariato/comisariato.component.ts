import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

export interface DialogData {
  idVuelo: string;
  idAeronave: string;
}


@Component({
  selector: 'app-comisariato',
  templateUrl: './comisariato.component.html',
  styleUrls: ['./comisariato.component.css']
})
export class ComisariatoComponent implements OnInit {
  verificacion: string = 'No se realizo';
  bolsas: string = 'No se cargaron';
  seguridad: string = 'No se verificaron';
  limpieza: string = 'No se realizo';
  baseUrl = 'https://opr-terrestres.herokuapp.com/v1/losilegales/comisariato/';
  constructor(
        public dialogRef: MatDialogRef<ComisariatoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private http: HttpClient,
  ) { }

  ngOnInit(): void {
    let url = this.baseUrl + this.data.idVuelo;
    this.http.get<any>(url).subscribe( (response) => {
      if(response[0].verificacionInterna){
        this.verificacion = "Realizada";
      }
      if(response[0].verificacionCartillasBolsas){
        this.bolsas = "Cargadas";
      }
      if(response[0].verificacionElementosSeguridad){
        this.seguridad = "Colocados";
      }
      if(response[0].verificacionLimpieza){
        this.limpieza = "Realizada";
      }
    });
  }

  estilo(data: any){
    if(data.match('No')){
      return 'containerRechazado';
    }
    return 'container';
  }
  ok(){
    this.dialogRef.close();
  }


}
