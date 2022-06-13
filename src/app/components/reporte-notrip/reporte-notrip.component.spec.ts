import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteNotripComponent } from './reporte-notrip.component';

describe('ReporteNotripComponent', () => {
  let component: ReporteNotripComponent;
  let fixture: ComponentFixture<ReporteNotripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteNotripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteNotripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
