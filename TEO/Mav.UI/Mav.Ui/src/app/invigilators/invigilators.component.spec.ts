import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvigilatorsComponent } from './invigilators.component';

describe('InvigilatorsComponent', () => {
  let component: InvigilatorsComponent;
  let fixture: ComponentFixture<InvigilatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvigilatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvigilatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
