import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveNeedsComponent } from './executive-needs.component';

describe('ExecutiveNeedsComponent', () => {
  let component: ExecutiveNeedsComponent;
  let fixture: ComponentFixture<ExecutiveNeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutiveNeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
