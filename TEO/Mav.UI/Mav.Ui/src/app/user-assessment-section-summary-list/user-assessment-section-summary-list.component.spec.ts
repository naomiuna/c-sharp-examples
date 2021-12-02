import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentSectionSummaryListComponent } from './user-assessment-section-summary-list.component';

describe('UserAssessmentSectionSummaryListComponent', () => {
  let component: UserAssessmentSectionSummaryListComponent;
  let fixture: ComponentFixture<UserAssessmentSectionSummaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentSectionSummaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentSectionSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
