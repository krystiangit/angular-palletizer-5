import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetKcsComponent } from './set-kcs.component';

describe('SetKcsComponent', () => {
  let component: SetKcsComponent;
  let fixture: ComponentFixture<SetKcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetKcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetKcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
