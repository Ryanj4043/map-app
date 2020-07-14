import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinStyleComponent } from './pin-style.component';

describe('PinStyleComponent', () => {
  let component: PinStyleComponent;
  let fixture: ComponentFixture<PinStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
