import { TestBed } from '@angular/core/testing';

import { UsdaSearchService } from './usda-search.service';

describe('UsdaSearchService', () => {
  let service: UsdaSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsdaSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
