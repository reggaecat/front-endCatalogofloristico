import { TestBed } from '@angular/core/testing';

import { familiaServiceService } from './familia-service.service';

describe('OrdenServiceService', () => {
  let service: familiaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(familiaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
