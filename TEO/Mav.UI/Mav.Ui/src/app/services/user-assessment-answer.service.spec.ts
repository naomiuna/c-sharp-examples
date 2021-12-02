import { TestBed, inject } from '@angular/core/testing';

import { UserAssessmentAnswerService } from './user-assessment-answer.service';

describe('UserAssessmentAnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAssessmentAnswerService]
    });
  });

  it('should be created', inject([UserAssessmentAnswerService], (service: UserAssessmentAnswerService) => {
    expect(service).toBeTruthy();
  }));
});
