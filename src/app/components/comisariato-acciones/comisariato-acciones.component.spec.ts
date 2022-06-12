import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisariatoAccionesComponent } from './comisariato-acciones.component';

describe('ComisariatoAccionesComponent', () => {
  let component: ComisariatoAccionesComponent;
  let fixture: ComponentFixture<ComisariatoAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisariatoAccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisariatoAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
