import { TestBed } from '@angular/core/testing';

import { AddBoxService } from './add-box.service';

describe('AddBoxService', () => {
  let service: AddBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
