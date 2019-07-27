import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTimingComponent } from './change-timing.component';

describe('ChangeTimingComponent', () => {
  let component: ChangeTimingComponent;
  let fixture: ComponentFixture<ChangeTimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTimingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
