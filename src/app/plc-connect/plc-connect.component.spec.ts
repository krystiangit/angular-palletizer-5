import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlcConnectComponent } from './plc-connect.component';

describe('PlcConnectComponent', () => {
  let component: PlcConnectComponent;
  let fixture: ComponentFixture<PlcConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlcConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlcConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
