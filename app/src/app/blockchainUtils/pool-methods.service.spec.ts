import { TestBed } from '@angular/core/testing';

import { PoolMethodsService } from './pool-methods.service';

describe('PoolMethodsService', () => {
  let service: PoolMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoolMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
