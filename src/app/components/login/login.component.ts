import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
              private authService: AuthService
    ) { }
  hide :boolean = true;
  disabled : boolean = false;
  user = new FormControl('', [Validators.required, Validators.pattern(".{8}")]);
  password = new FormControl('', Validators.required);
  errorLogin$: boolean = false;


  getErrorMessage() {
    let mensaje = '';
    if(this.user.hasError('pattern')){
      mensaje = 'El usuario debe contener 8 caracteres';
    }
    else if(this.user.hasError('required')){
      mensaje = 'Debe ingresar un valor';
    }
    return mensaje;
  }
  cambios(){
    this.user.valueChanges.subscribe( () => {
      this.errorLogin$ = false
      this.authService.setError(false);
    })
    this.password.valueChanges.subscribe( ()=> {
      this.errorLogin$ = false;
      this.authService.setError(false);
    })
  }

  ngOnInit(): void {
    this.cambios();
  }
  
  ingresar(){
    this.authService.login(this.user.value,this.password.value);
    this.errorLogin$ = this.authService.isErrorLogin;
  }

}
