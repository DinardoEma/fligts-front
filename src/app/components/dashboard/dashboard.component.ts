import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard: any;
  selected = 'Vision 360';
  dashboards: any[] = ['Ninguno', 'Vision 360', 'Operaciones Terrestres'];
  constructor() { }

  ngOnInit(): void {
  }

}
