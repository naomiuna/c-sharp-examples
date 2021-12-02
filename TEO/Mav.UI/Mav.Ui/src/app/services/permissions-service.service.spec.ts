import { TestBed, inject } from '@angular/core/testing';

import { PermissionsServiceService } from './permissions-service.service';

describe('PermissionsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionsServiceService]
    });
  });

  it('should be created', inject([PermissionsServiceService], (service: PermissionsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
