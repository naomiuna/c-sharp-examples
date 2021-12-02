import { TestBed, inject } from '@angular/core/testing';

import { AssessmentYearService } from './assessment-year.service';

describe('AssessmentYearService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentYearService]
    });
  });

  it('should be created', inject([AssessmentYearService], (service: AssessmentYearService) => {
    expect(service).toBeTruthy();
  }));
});
