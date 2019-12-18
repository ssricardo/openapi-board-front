import { TestBed } from '@angular/core/testing';

import { ServerFailureHandler } from './server-failure-handler';

describe('ServerFailureHandler', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerFailureHandler = TestBed.get(ServerFailureHandler);
    expect(service).toBeTruthy();
  });
});
