import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvigilatorDetailsAssessmentComponent } from './invigilator-details-assessment.component';

describe('InvigilatorDetailsAssessmentComponent', () => {
  let component: InvigilatorDetailsAssessmentComponent;
  let fixture: ComponentFixture<InvigilatorDetailsAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvigilatorDetailsAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvigilatorDetailsAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
