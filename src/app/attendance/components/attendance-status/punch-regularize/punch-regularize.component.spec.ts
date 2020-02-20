import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchRegularizeComponent } from './punch-regularize.component';

describe('PunchRegularizeComponent', () => {
  let component: PunchRegularizeComponent;
  let fixture: ComponentFixture<PunchRegularizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchRegularizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchRegularizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
