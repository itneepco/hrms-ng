import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTableComponent } from './training-table.component';

describe('TrainingTableComponent', () => {
  let component: TrainingTableComponent;
  let fixture: ComponentFixture<TrainingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
