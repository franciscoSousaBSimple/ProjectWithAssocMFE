import { TestBed } from '@angular/core/testing';

import { AssociationServiceService } from './association-service.service';

describe('AssociationServiceService', () => {
  let service: AssociationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
