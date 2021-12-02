import { TestBed, inject } from '@angular/core/testing';

import { AssessmentRoleService } from "./assessment-role.service";

describe('AssessmentRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentRoleService]
    });
  });

  it('should be created', inject([AssessmentRoleService], (service: AssessmentRoleService) => {
    expect(service).toBeTruthy();
  }));
});
