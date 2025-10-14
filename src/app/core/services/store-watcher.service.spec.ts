import { TestBed } from '@angular/core/testing';

import { StoreWatcherService } from './store-watcher.service';

describe('StoreWatcherService', () => {
  let service: StoreWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
