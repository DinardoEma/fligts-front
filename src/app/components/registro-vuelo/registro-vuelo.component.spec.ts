import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVueloComponent } from './registro-vuelo.component';

describe('RegistroVueloComponent', () => {
  let component: RegistroVueloComponent;
  let fixture: ComponentFixture<RegistroVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroVueloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
