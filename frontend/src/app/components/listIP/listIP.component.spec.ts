/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListIPComponent } from './listIP.component';

describe('ListIPComponent', () => {
  let component: ListIPComponent;
  let fixture: ComponentFixture<ListIPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
