import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendTableComponent } from './attend-table.component';

describe('AttendTableComponent', () => {
  let component: AttendTableComponent;
  let fixture: ComponentFixture<AttendTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
