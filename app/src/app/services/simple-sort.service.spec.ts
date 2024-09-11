import { TestBed } from '@angular/core/testing';

import { SimpleSortService } from './simple-sort.service';

describe('SimpleSortService', () => {
  let service: SimpleSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
