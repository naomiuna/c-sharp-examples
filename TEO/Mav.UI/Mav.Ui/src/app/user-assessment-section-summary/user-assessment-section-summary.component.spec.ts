import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentSectionSummaryComponent } from './user-assessment-section-summary.component';

describe('UserAssessmentSectionSummaryComponent', () => {
  let component: UserAssessmentSectionSummaryComponent;
  let fixture: ComponentFixture<UserAssessmentSectionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentSectionSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentSectionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
