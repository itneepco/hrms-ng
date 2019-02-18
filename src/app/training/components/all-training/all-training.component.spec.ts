import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrainingComponent } from './all-training.component';

describe('AllTrainingComponent', () => {
  let component: AllTrainingComponent;
  let fixture: ComponentFixture<AllTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
