import { TestBed } from '@angular/core/testing';

import { ControlDeOrdenesService } from './control-de-ordenes.service';

describe('ControlDeOrdenesService', () => {
  let service: ControlDeOrdenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlDeOrdenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
