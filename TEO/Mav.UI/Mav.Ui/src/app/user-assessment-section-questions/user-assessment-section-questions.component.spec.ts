import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentSectionQuestionsComponent } from './user-assessment-section-questions.component';

describe('UserAssessmentSectionQuestionsComponent', () => {
  let component: UserAssessmentSectionQuestionsComponent;
  let fixture: ComponentFixture<UserAssessmentSectionQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssessmentSectionQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssessmentSectionQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
