import { TestBed } from '@angular/core/testing';

import { RiotService } from './riot.service';

describe('RiotService', () => {
  let service: RiotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
