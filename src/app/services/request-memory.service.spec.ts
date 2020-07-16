import { TestBed } from '@angular/core/testing';

import { RequestMemoryService } from './request-memory.service';

describe('RequestMemoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestMemoryService = TestBed.get(RequestMemoryService);
    expect(service).toBeTruthy();
  });
});
