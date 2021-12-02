import { TestBed, inject } from '@angular/core/testing';

import { UserAssessmentSectionService } from './user-assessment-section.service';

describe('UserAssessmentSectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAssessmentSectionService]
    });
  });

  it('should be created', inject([UserAssessmentSectionService], (service: UserAssessmentSectionService) => {
    expect(service).toBeTruthy();
  }));
});
