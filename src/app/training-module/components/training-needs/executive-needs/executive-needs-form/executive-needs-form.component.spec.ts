import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveNeedsFormComponent } from './executive-needs-form.component';

describe('ExecutiveNeedsFormComponent', () => {
  let component: ExecutiveNeedsFormComponent;
  let fixture: ComponentFixture<ExecutiveNeedsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutiveNeedsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveNeedsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
