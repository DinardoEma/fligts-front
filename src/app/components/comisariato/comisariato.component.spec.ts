import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisariatoComponent } from './comisariato.component';

describe('ComisariatoComponent', () => {
  let component: ComisariatoComponent;
  let fixture: ComponentFixture<ComisariatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisariatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisariatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
