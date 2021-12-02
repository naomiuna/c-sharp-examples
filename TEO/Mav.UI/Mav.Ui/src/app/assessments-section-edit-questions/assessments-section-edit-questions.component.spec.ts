import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsSectionEditQuestionsComponent } from './assessments-section-edit-questions.component';

describe('AssessmentsSectionEditQuestionsComponent', () => {
  let component: AssessmentsSectionEditQuestionsComponent;
  let fixture: ComponentFixture<AssessmentsSectionEditQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentsSectionEditQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsSectionEditQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
