import { TestBed } from '@angular/core/testing';

import { SetKcsService } from './set-kcs.service';

describe('SetKcsService', () => {
  let service: SetKcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetKcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
