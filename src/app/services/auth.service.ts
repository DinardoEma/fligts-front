import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private errorLogin = false;
  
  iata: any;
  id: number = 0;
  codigoUser : string = '';
  rol: number = 0;
  

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  get isErrorLogin(){
    return this.errorLogin;
  }

  public setError(data: boolean){
    this.errorLogin = data;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  login(user:string, password: string){
    let queryparams = new HttpParams();
    queryparams = queryparams.append("contraseña",password);
    queryparams = queryparams.append("codigoUsuario",user);
    this.http.get<any>('https://opr-terrestres.herokuapp.com/v1/losilegales/usuarioLogin', {params: queryparams})
      .subscribe(
        (response) => {
        if(response.text.match("exitoso")){
          this.id = response.idUsuario;
          this.codigoUser = response.codigoUsuario;
          this.cargarDatos();
        }
        else this.errorLogin = true;
      });
  }

  Loguear(){
    this.loggedIn.next(true);
    console.log(this.rol);
    if(this.rol === 1 || this.rol === 14 || this.rol === 16){
      this.router.navigate(['/dashboard']);
    }
    else { this.router.navigate(['/user']); }
  }
  getId(){
    return this.id;
  }
  getCodUser(){
    return this.codigoUser;
  }
  getRol(){
    return this.rol;
  }
  setRol(data: any){
    this.rol = data;
  }
  getIata(){
    return this.iata;
  }
  setIata(dato:any){
    this.iata = dato;
  }


  logout() {                            
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  cargarDatos(){
    this.http.get<any>('https://opr-terrestres.herokuapp.com/v1/losilegales/usuarios')
    .subscribe((data) => {
      this.cargarInfo(data);
    });
  }

  cargarInfo(data:any){
    data.forEach((element: any) => {
      if(element.idUsuario === this.id){
        this.rol = element.rolUsuario;
      }
    });
    this.Loguear();
  }
}