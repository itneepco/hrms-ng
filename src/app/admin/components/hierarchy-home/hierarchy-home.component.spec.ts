import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyHomeComponent } from './hierarchy-home.component';

describe('HierarchyHomeComponent', () => {
  let component: HierarchyHomeComponent;
  let fixture: ComponentFixture<HierarchyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
