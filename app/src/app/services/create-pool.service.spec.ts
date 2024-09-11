import { TestBed } from '@angular/core/testing';

import { CreatePoolService } from './create-pool.service';

describe('CreatePoolService', () => {
  let service: CreatePoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
