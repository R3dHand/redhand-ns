import { TestBed } from '@angular/core/testing';

import { PagePreferencesService } from './page-preferences.service';

describe('PagePreferencesService', () => {
  let service: PagePreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagePreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
