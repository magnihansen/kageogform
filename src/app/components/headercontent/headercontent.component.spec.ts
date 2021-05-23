import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadercontentComponent } from './headercontent.component';

describe('HeadercontentComponent', () => {
  let component: HeadercontentComponent;
  let fixture: ComponentFixture<HeadercontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadercontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadercontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
