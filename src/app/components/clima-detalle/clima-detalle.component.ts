import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  climaActual: string;
}
@Component({
  selector: 'app-clima-detalle',
  templateUrl: './clima-detalle.component.html',
  styleUrls: ['./clima-detalle.component.css']
})
export class ClimaDetalleComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ClimaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

  ngOnInit(): void {
  }
  
  ok(){
    this.dialogRef.close();
  }

}
