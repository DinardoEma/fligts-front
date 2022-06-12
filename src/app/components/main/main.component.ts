import { Component, OnInit , ViewChild, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  user: any;
  dataTable: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router : Router,
              private http: HttpClient,
              public dialog: MatDialog,
              private sidenav: SidenavComponent,
              private cdr: ChangeDetectorRef
    ) {  this.user = this.sidenav.cargarUser();
    }

  ngOnInit() {
    this.cdr.detectChanges();
    this.cargarDatos(false);
  }

  cargarDatos(update: boolean){
    this.http.get<any>('https://opr-terrestres.herokuapp.com/v1/losilegales/usuarios')
    .subscribe((data) => {
      if(update){
        this.dataTable.data = data;
      }
      else {
        this.dataTable = new MatTableDataSource(data);
      }
      this.dataTable.paginator = this.paginator;
    });
  }

  
  displayedColumns: string[] = ['name', 'apellido','dni','codigo','correo', 'rol','aeropuerto','activo','nombreCreador' ,'edit'];
  
  /*getRutas(){
    console.log("getRutas");
    this.http.get<any>('https://opr-terrestres.herokuapp.com/v1/losilegales/rutas').subscribe((data) => {
      console.log(data);
    })
  }*/



  usuarios(){
    this.router.navigate(['./main']);
  }
  createUser(){
    this.router.navigate(['./add']);
  }

  editarUser(info:any){
    this.openDialog(info.idUsuario, info.nombre, info.apellido, info.codigoUsuario, info.contraseña, 
      info.fechaCreacion, info.nombreCreador, this.user, info.activo, info.dni, info.iataAeropuerto, 
      info.rolUsuario, info.correo);
  }


  openDialog(id:any, nombre: any, apellido: any, codigoUsuario:any,  contrasena:any, fechaCrear: Date, 
     creador: any, user: any, estado:any, dni: any, aeropuerto:any,     rol:any, correo:any, ){
    const dialogRef = this.dialog.open(EditComponent, {
      width: '500px',
      data: {idUsuario:id, nombre: nombre, apellido: apellido, codigoUsuario:codigoUsuario, 
        contraseña: contrasena,  fechaCreacion: fechaCrear,  nombreCreador: creador, 
        nombreModificador: user, activo:estado, dni:dni,  iataAeropuerto: aeropuerto, rolUsuario: rol,  
        correo: correo},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        if(result.borrado != null){
          const headers = { 'content-type': 'application/json'};
          this.http.put<any>('https://opr-terrestres.herokuapp.com/v1/losilegales/usuario', result.borrado, {headers: headers}).subscribe(data => {
            confirm("Usuario eliminado con exito");
            this.cargarDatos(true);
          });
        }else {
          const headers = { 'content-type': 'application/json'};
          this.http.put<any>('https://opr-terrestres.herokuapp.com/v1/losilegales/usuario', result, {headers: headers}).subscribe(data => {
          confirm("Usuario modificado con exito");
          this.cargarDatos(true);
          });
        }
      }
    });
  }

}
