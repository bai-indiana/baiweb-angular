import { TestBed } from '@angular/core/testing';

import { MembershipRegService } from './membership.reg.service';

describe('MembershipService', () => {
  let service: MembershipRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
