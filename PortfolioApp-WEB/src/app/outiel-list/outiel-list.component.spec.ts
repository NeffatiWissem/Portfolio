/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OutielListComponent } from './outiel-list.component';

describe('OutielListComponent', () => {
  let component: OutielListComponent;
  let fixture: ComponentFixture<OutielListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutielListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutielListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
