import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWorkflowComponent } from './approve-workflow.component';

describe('ApproveWorkflowComponent', () => {
  let component: ApproveWorkflowComponent;
  let fixture: ComponentFixture<ApproveWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
