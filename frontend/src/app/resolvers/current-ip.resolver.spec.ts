import { TestBed } from '@angular/core/testing';

import { CurrentIPResolver } from './current-ip.resolver';

describe('CurrentIPResolver', () => {
  let resolver: CurrentIPResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CurrentIPResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
