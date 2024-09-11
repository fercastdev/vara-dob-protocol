import { TestBed } from '@angular/core/testing';

import { ParticipantInstanceService } from './participant-instance.service';

describe('ParticipantInstanceService', () => {
  let service: ParticipantInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
