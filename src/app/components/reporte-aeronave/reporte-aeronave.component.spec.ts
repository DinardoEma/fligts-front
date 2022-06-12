import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAeronaveComponent } from './reporte-aeronave.component';

describe('ReporteAeronaveComponent', () => {
  let component: ReporteAeronaveComponent;
  let fixture: ComponentFixture<ReporteAeronaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAeronaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAeronaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
