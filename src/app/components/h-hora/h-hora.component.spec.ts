import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HHoraComponent } from './h-hora.component';

describe('HHoraComponent', () => {
  let component: HHoraComponent;
  let fixture: ComponentFixture<HHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HHoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
