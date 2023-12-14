import { TestBed } from '@angular/core/testing';

import { TvshowsFavService } from './tvshows-fav.service';

describe('TvshowsFavService', () => {
  let service: TvshowsFavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvshowsFavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
