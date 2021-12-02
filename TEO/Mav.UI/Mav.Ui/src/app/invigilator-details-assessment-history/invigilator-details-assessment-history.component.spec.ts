import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvigilatorDetailsAssessmentHistoryComponent } from './invigilator-details-assessment-history.component';

describe('InvigilatorDetailsAssessmentHistoryComponent', () => {
  let component: InvigilatorDetailsAssessmentHistoryComponent;
  let fixture: ComponentFixture<InvigilatorDetailsAssessmentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvigilatorDetailsAssessmentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvigilatorDetailsAssessmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
