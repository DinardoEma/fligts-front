import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard: any;
  selected = 'Ninguno';
  dashboards: any[] = ['Ninguno', '360', 'Operaciones Terrestres'];
  constructor() { }

  ngOnInit(): void {
  }

}
