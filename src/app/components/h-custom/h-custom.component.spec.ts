import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HCustomComponent } from './h-custom.component';

describe('HCustomComponent', () => {
  let component: HCustomComponent;
  let fixture: ComponentFixture<HCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
