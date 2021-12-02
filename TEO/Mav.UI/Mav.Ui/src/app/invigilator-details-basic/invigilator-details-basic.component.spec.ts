import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvigilatorDetailsBasicComponent } from './invigilator-details-basic.component';

describe('InvigilatorDetailsBasicComponent', () => {
  let component: InvigilatorDetailsBasicComponent;
  let fixture: ComponentFixture<InvigilatorDetailsBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvigilatorDetailsBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvigilatorDetailsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
