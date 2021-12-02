import { TestBed, inject } from '@angular/core/testing';

import { CentreServiceService } from './centre-service.service';

describe('CentreServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CentreServiceService]
    });
  });

  it('should be created', inject([CentreServiceService], (service: CentreServiceService) => {
    expect(service).toBeTruthy();
  }));
});
