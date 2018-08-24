import { TestBed, inject } from '@angular/core/testing';

import { GrillOffService } from './grill-off.service';

describe('GrillOffService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrillOffService]
    });
  });

  it('should be created', inject([GrillOffService], (service: GrillOffService) => {
    expect(service).toBeTruthy();
  }));
});
