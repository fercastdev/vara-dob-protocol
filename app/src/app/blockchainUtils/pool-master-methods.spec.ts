import { TestBed } from '@angular/core/testing';

import { PoolMasterMethodsService } from './pool-master-methods';

describe('PoolMasterMethodsService', () => {
  let service: PoolMasterMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoolMasterMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
