import { TestBed } from '@angular/core/testing';

import { MetamaskConnectService } from './metamask-connect.service';

describe('MetamaskConnectService', () => {
  let service: MetamaskConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetamaskConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
