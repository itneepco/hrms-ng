import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyElComponent } from './apply-el.component';

describe('ApplyElComponent', () => {
  let component: ApplyElComponent;
  let fixture: ComponentFixture<ApplyElComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyElComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
