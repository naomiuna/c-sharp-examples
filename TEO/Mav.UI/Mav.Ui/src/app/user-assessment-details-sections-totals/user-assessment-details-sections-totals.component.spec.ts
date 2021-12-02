import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentDetailsSectionsTotalsComponent } from './user-assessment-details-sections-totals.component';

describe('UserAssessmentDetailsSectionsTotalsComponent', () => {
  let component: UserAssessmentDetailsSectionsTotalsComponent;
  let fixture: ComponentFixture<UserAssessmentDetailsSectionsTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentDetailsSectionsTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentDetailsSectionsTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
