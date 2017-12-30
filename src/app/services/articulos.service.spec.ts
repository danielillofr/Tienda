import { TestBed, inject } from '@angular/core/testing';

import { ArticulosService } from './articulos.service';

describe('ArticulosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticulosService]
    });
  });

  it('should be created', inject([ArticulosService], (service: ArticulosService) => {
    expect(service).toBeTruthy();
  }));
});
