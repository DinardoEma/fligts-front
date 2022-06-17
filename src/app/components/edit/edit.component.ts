import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  nombre: any;
  apellido: any;
  codigoUsuario: any;
  dni: any;
  contrasena: any;
  fechaCreacion: any;
  nombreCreador: any;
  nombreModificador: any;
  activo: any;
  correo: any;
  rolUsuario: any;
  iataAeropuerto: any;
  idUsuario: any;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  hide: boolean = true;
  constructor(private router : Router,
              public dialogRef: MatDialogRef<EditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

  ngOnInit(): void {

  }
  cancelar(){
    this.dialogRef.close();
  }

}
