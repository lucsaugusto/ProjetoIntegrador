
import { TestBed } from '@angular/core/testing';

import { AjudaService } from './ajuda.service';

describe('AjudaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AjudaService = TestBed.get(AjudaService);
    expect(service).toBeTruthy();
  });
});

