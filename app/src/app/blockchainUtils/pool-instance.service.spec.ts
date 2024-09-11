import { TestBed } from '@angular/core/testing';

import { PoolInstanceService } from './pool-instance.service';

describe('PoolInstanceService', () => {
  let service: PoolInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoolInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
