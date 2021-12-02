import { TestBed, inject } from '@angular/core/testing';

import { OrganisationTypeService } from './organisation-type.service';

describe('OrganisationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganisationTypeService]
    });
  });

  it('should be created', inject([OrganisationTypeService], (service: OrganisationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
