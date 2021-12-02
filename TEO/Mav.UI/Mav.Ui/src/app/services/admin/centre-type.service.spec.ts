import { TestBed, inject } from '@angular/core/testing';

import { CentreTypeService } from './centre-type.service';

describe('CentreTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CentreTypeService]
    });
  });

  it('should be created', inject([CentreTypeService], (service: CentreTypeService) => {
    expect(service).toBeTruthy();
  }));
});
