import { TestBed, inject } from '@angular/core/testing';

import { GrilloffService } from './grilloff.service';

describe('GrilloffService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrilloffService]
    });
  });

  it('should be created', inject([GrilloffService], (service: GrilloffService) => {
    expect(service).toBeTruthy();
  }));
});
