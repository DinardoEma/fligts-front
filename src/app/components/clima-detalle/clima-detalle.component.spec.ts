import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaDetalleComponent } from './clima-detalle.component';

describe('ClimaDetalleComponent', () => {
  let component: ClimaDetalleComponent;
  let fixture: ComponentFixture<ClimaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
