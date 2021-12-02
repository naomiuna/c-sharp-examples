import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvigilatorsWrapperComponent } from './invigilators-wrapper.component';

describe('InvigilatorsWrapperComponent', () => {
  let component: InvigilatorsWrapperComponent;
  let fixture: ComponentFixture<InvigilatorsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvigilatorsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvigilatorsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
