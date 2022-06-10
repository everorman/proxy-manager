import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyAdminComponent } from './proxy-admin.component';

describe('ProxyAdminComponent', () => {
  let component: ProxyAdminComponent;
  let fixture: ComponentFixture<ProxyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProxyAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
