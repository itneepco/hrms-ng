import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonexecutiveNeedsComponent } from './nonexecutive-needs.component';

describe('NonexecutiveNeedsComponent', () => {
  let component: NonexecutiveNeedsComponent;
  let fixture: ComponentFixture<NonexecutiveNeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonexecutiveNeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonexecutiveNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
