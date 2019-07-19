import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRosterComponent } from './group-roster.component';

describe('GroupRosterComponent', () => {
  let component: GroupRosterComponent;
  let fixture: ComponentFixture<GroupRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
