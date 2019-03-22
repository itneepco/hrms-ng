import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInstituteComponent } from './training-institute.component';

describe('TrainingInstituteComponent', () => {
  let component: TrainingInstituteComponent;
  let fixture: ComponentFixture<TrainingInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingInstituteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
