import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentDetailsSectionComponent } from './user-assessment-details-section.component';

describe('UserAssessmentDetailsSectionComponent', () => {
  let component: UserAssessmentDetailsSectionComponent;
  let fixture: ComponentFixture<UserAssessmentDetailsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentDetailsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentDetailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
