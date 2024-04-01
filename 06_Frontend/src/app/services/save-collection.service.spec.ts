import { TestBed } from '@angular/core/testing';

import { SaveCollectionService } from './save-collection.service';

describe('SaveCollectionService', () => {
  let service: SaveCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
