import { TestBed } from '@angular/core/testing';

import { ContractedService } from './contracted.service';

describe('ContractedService', () => {
  let service: ContractedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
