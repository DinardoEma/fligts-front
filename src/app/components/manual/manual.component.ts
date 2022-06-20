import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css']
})
export class ManualComponent implements OnInit {
  pdfSrc: any;
  errorManual: boolean = false;
  constructor(
    private service: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadPdf();
  }

  loadPdf(){
    let id = this.service.getRol();
    if(id === 1){
      this.pdfSrc = '../../../../assets/PDF/Manual de Administrador.pdf';
    }
    else if(id === 2){
      this.pdfSrc = '../../../../assets/PDF/Manual de Supervisor de Carga.pdf';
    }
    else if(id === 8){
      this.pdfSrc = '../../../../assets/PDF/Manual de Supervisor de Comisariato.pdf';
    }
    else if(id === 16){
      this.pdfSrc = '../../../../assets/PDF/Manual de Gerente.pdf';
    }
    else if(id === 14){
      this.pdfSrc = '../../../../assets/PDF/Manual de Auditor.pdf';
    }
    else this.errorManual = true;
  }
}
