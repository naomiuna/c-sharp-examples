import { TestBed, inject } from '@angular/core/testing';

import { ExamServiceService } from './exam-service.service';

describe('ExamServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamServiceService]
    });
  });

  it('should be created', inject([ExamServiceService], (service: ExamServiceService) => {
    expect(service).toBeTruthy();
  }));
});
