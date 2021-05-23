import { TestBed, inject } from '@angular/core/testing';

import { ContenttypeService } from './contenttype.service';

describe('ContenttypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContenttypeService]
    });
  });

  it('should be created', inject([ContenttypeService], (service: ContenttypeService) => {
    expect(service).toBeTruthy();
  }));
});
