import { TestBed, inject } from '@angular/core/testing';

import { PageServiceService } from './page-service.service';

describe('PageServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageServiceService]
    });
  });

  it('should be created', inject([PageServiceService], (service: PageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
