import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCancelComponent } from './reporte-cancel.component';

describe('ReporteCancelComponent', () => {
  let component: ReporteCancelComponent;
  let fixture: ComponentFixture<ReporteCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
