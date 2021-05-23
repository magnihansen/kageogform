import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersserviceComponent } from './othersservice.component';

describe('OthersserviceComponent', () => {
  let component: OthersserviceComponent;
  let fixture: ComponentFixture<OthersserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
