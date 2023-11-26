import { TestBed } from '@angular/core/testing';

import { TvshowsApiService } from './tvshows-api.service';

describe('TvshowsApiService', () => {
  let service: TvshowsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvshowsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
