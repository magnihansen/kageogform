import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicetabsComponent } from './servicetabs.component';

describe('ServicetabsComponent', () => {
  let component: ServicetabsComponent;
  let fixture: ComponentFixture<ServicetabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicetabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicetabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
