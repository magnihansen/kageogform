import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterpagecontentComponent } from './routerpagecontent.component';

describe('RouterpagecontentComponent', () => {
  let component: RouterpagecontentComponent;
  let fixture: ComponentFixture<RouterpagecontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterpagecontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterpagecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
