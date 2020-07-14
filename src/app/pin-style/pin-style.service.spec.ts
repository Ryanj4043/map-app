import { TestBed } from '@angular/core/testing';

import { PinStyleService } from './pin-style.service';

describe('PinStyleService', () => {
  let service: PinStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
