import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  rol : string = '';
  nombre: string = '';
  apellido: string = '';
  rolUsuario: number;
  codigoUsuario : string = '';
  idUser : number = 0;
  aeropuerto : string = '';
  correo: string = '';
  dni: number;
  permisos: [string] = [''];


  constructor( private auth: AuthService,
               private http: HttpClient,
               private side: SidenavComponent,
               private clima: ClimaService
  ) 
  { 
    this.idUser = side.cargarID();
    this.codigoUsuario = this.side.cargarUser();
  }

  ngOnInit(): void {
    this.idUser = this.auth.getId();
    this.cargarDatos();
  }

  cargarDatos(){
    this.http.get<any>('https://opr-terrestres.herokuapp.com/v1/losilegales/usuarios')
    .subscribe((data) => {
      this.cargarInfo(data);
    });
  }

  cargarInfo(data:any){
    data.forEach((element: any) => {
      if(element.idUsuario === this.idUser){
        this.rolUsuario = element.rolUsuario;
        this.nombre = element.nombre;
        this.apellido = element.apellido;
        this.aeropuerto = element.iataAeropuerto;
        this.correo = element.correo;
        this.dni = element.dni;
        this.auth.setRol(this.rolUsuario);
        this.side.setRol(this.rolUsuario);
        this.side.setRolTexto(this.roltoTexto(this.rolUsuario));
      }
    });
    this.setAeropuerto();
  }

  roltoTexto(number:any){
    let rol = '';
    if(number === 1){
      rol = "Administrador";
    }
    if(number === 2){
      rol = "Supervisor de Carga";
    }
    if(number === 8){
      rol = "Supervisor de Comisariato";
    }
    if(number === 14){
      rol = "Auditor";
    }
    if(number === 16){
      rol = "Gerente";
    }
    return rol;
  }

  setAeropuerto(){
    this.clima.getCoordenadas(this.aeropuerto);
    return this.auth.setIata(this.aeropuerto);
  }

}


export interface UserInterface {
  name: string;
  apellido: string;
  dni: number;
  codigoUsuario: string;
  rolUsuario: number;
  iataAeropuerto: string;
  nombreCreador: string;
  activo: boolean;
  correo: string;
}
