import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HConsumoComponent } from './h-consumo.component';

describe('HConsumoComponent', () => {
  let component: HConsumoComponent;
  let fixture: ComponentFixture<HConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HConsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
