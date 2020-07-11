import { TestBed } from '@angular/core/testing';

import { SizeCheckService } from './size-check.service';

describe('SizeCheckService', () => {
  let service: SizeCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
