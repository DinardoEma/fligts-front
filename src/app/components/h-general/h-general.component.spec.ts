import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HGeneralComponent } from './h-general.component';

describe('HGeneralComponent', () => {
  let component: HGeneralComponent;
  let fixture: ComponentFixture<HGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
