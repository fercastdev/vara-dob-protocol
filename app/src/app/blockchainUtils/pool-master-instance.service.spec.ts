import { TestBed } from '@angular/core/testing';

import { PoolMasterInstanceService } from './pool-master-instance.service';

describe('PoolMasterInstanceService', () => {
  let service: PoolMasterInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoolMasterInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
