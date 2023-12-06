import { TestBed } from '@angular/core/testing';

import { MembershipGridService } from './membership-grid.service';

describe('MembershipGridService', () => {
  let service: MembershipGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
