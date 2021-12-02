import { TestBed, inject } from '@angular/core/testing';

import { UserAssessmentService } from './user-assessment.service';

describe('UserAssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAssessmentService]
    });
  });

  it('should be created', inject([UserAssessmentService], (service: UserAssessmentService) => {
    expect(service).toBeTruthy();
  }));
});
