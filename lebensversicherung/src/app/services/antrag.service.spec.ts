import { TestBed } from '@angular/core/testing';

import { AntragService } from './antrag.service';

describe('AntragService', () => {
  let service: AntragService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntragService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
