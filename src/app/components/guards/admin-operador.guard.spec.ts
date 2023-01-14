import { TestBed } from '@angular/core/testing';

import { AdminOperadorGuard } from './admin-operador.guard';

describe('AdminOperadorGuard', () => {
  let guard: AdminOperadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminOperadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
