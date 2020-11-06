import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineTrayComponent } from './define-tray.component';

describe('DefineTrayComponent', () => {
  let component: DefineTrayComponent;
  let fixture: ComponentFixture<DefineTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineTrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
