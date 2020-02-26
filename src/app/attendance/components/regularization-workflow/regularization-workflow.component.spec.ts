import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizationWorkflowComponent } from './regularization-workflow.component';

describe('RegularizationWorkflowComponent', () => {
  let component: RegularizationWorkflowComponent;
  let fixture: ComponentFixture<RegularizationWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularizationWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularizationWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
