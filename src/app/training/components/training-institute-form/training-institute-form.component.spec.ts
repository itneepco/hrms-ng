import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInstituteFormComponent } from './training-institute-form.component';

describe('TrainingInstituteFormComponent', () => {
  let component: TrainingInstituteFormComponent;
  let fixture: ComponentFixture<TrainingInstituteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingInstituteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInstituteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
