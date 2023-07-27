import { TestBed } from '@angular/core/testing';

import { ordenServiceService } from './orden-service.service';

describe('OrdenServiceService', () => {
  let service: ordenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ordenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
