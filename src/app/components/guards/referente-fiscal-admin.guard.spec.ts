import { TestBed } from '@angular/core/testing';

import { ReferenteFiscalAdminGuard } from './referente-fiscal-admin.guard';

describe('ReferenteFiscalAdminGuard', () => {
  let guard: ReferenteFiscalAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReferenteFiscalAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
