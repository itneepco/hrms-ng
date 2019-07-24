import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenGroupRosterComponent } from './gen-group-roster.component';

describe('GenGroupRosterComponent', () => {
  let component: GenGroupRosterComponent;
  let fixture: ComponentFixture<GenGroupRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenGroupRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenGroupRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
