import { TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';

describe('SpaceshipsService', () => {
  let service: SwapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
