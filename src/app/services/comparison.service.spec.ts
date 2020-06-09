import { TestBed } from '@angular/core/testing';

import { ComparisonService } from './comparison.service';
import {HttpTestingController} from "@angular/common/http/testing";

describe('ComparisonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let httpMock: HttpTestingController;

  it('should be created', () => {
    const service: ComparisonService = TestBed.get(ComparisonService);
    expect(service).toBeTruthy();
  });

  it('needs to have all input values valid', () => {
    const service: ComparisonService = TestBed.get(ComparisonService);
    expect(service.compareApps('first', 'ok', '', 's', 'sns', 'sv'))
        .toThrowError()
    // expect()
    // httpMock.expectOne()
  })
});
