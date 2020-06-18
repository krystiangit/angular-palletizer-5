import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoxComponent } from './add-box.component';

describe('AddBoxComponent', () => {
  let component: AddBoxComponent;
  let fixture: ComponentFixture<AddBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
