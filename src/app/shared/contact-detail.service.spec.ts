import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact-detail.service';

describe('ContactDetailService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
