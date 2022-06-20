import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private router : Router,
              private http: HttpClient,
              private auth: AuthService
    ) { }
  spinner: boolean = false;
  rol: string = '';
  nombreCreador: string = '';
  aeropuerto: string = '';
  rolesTexto: any[] = ['Administrador', 'Supervisor de Carga', 'Supervisor de Comisariato', 'Auditor', 'Gerente'];
  permisos = "NO2";
  hide: boolean = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  dni = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{7,8}')]);
  nombre = new FormControl('', Validators.required);
  apellido = new FormControl('', Validators.required);
  contrasena = new FormControl('', Validators.required);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Email invalido' : '';
  }
  getErrorMessageDNI() {
    let mensaje = '';
    if(this.dni.hasError('pattern')){
      mensaje = 'Debe ingresar un DNI valido';
    }
    else if(this.dni.hasError('required')){
      mensaje = 'Debe ingresar un valor';
    }
    return mensaje;
  }

  ngOnInit(): void {
  }

  volver(){
    this.router.navigate(['./main']);
  }
  guardar(){
    this.spinner = true;
    const headers = { 'content-type': 'application/json'};
    let body = JSON.stringify(this.body());
    console.log(body);
    this.http.post('https://opr-terrestres.herokuapp.com/v1/losilegales/usuario', body, {headers: headers})
      .subscribe(
        (response) => {
            console.log(response);
            this.spinner = false;
            alert("usuario creado con exito");
            this.router.navigate(['./main']);
        },
        (error) => {
          this.spinner = false;
          if(error.error.message != null){
            if(error.error.message.match("ya esta registrado")){
              alert("mail ya registrado");
            }
          }
          else alert("ocurrio un error");
        }
    );
  }

  body(){
    let body = {
      "nombre" : this.nombre.value,
      "apellido" : this.apellido.value,
      "dni" : this.dni.value,
      "contraseña" : this.contrasena.value,
      "nombreCreador" : this.auth.getCodUser(),
      "rolUsuario" : this.rolToNumber(this.rol),
      "correo" : this.email.value,
      "iataAeropuerto" : this.aeropuerto
    };
    return body;
  }
  rolToNumber(rol: any){
    let id;
    if(rol.match('Administrador')){
      id = 1;
    }
    if(rol.match('Supervisor de Carga')){
      id = 2;
    }
    if(rol.match('Supervisor de Comisariato')){
      id = 8;
    }
    if(rol.match('Auditor')){
      id = 14;
    }
    if(rol.match('Gerente')){
      id = 16;
    }
    return id;
  }
}
