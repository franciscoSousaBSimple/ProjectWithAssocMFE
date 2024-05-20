import { TestBed } from '@angular/core/testing';

import { ColaboratorServiceService } from './colaborator-service.service';

describe('ColaboratorServiceService', () => {
  let service: ColaboratorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColaboratorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
