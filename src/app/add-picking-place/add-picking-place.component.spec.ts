import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPickingPlaceComponent } from './add-picking-place.component';

describe('AddPickingPlaceComponent', () => {
  let component: AddPickingPlaceComponent;
  let fixture: ComponentFixture<AddPickingPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPickingPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPickingPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
