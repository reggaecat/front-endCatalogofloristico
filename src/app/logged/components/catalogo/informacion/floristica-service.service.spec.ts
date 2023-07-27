import { TestBed } from '@angular/core/testing';

import { FloristicaServiceService } from './floristica-service.service';

describe('FloristicaServiceService', () => {
  let service: FloristicaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloristicaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
