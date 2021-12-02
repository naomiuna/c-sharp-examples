import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficersWrapperComponent } from './officers-wrapper.component';

describe('OfficersWrapperComponent', () => {
  let component: OfficersWrapperComponent;
  let fixture: ComponentFixture<OfficersWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficersWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficersWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
