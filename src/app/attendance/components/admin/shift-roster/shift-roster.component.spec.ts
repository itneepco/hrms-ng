import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRosterComponent } from './shift-roster.component';

describe('ShiftRosterComponent', () => {
  let component: ShiftRosterComponent;
  let fixture: ComponentFixture<ShiftRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
