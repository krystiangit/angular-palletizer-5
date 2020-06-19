import { TestBed } from '@angular/core/testing';

import { AddPickingPlaceService } from './add-picking-place.service';

describe('AddPickingPlaceService', () => {
  let service: AddPickingPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPickingPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
