import { TestBed } from '@angular/core/testing';

import { AuthSrvicesService } from './auth-srvices.service';

describe('AuthSrvicesService', () => {
  let service: AuthSrvicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSrvicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
