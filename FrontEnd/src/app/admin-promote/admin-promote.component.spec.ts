import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromoteComponent } from './admin-promote.component';

describe('AdminPromoteComponent', () => {
  let component: AdminPromoteComponent;
  let fixture: ComponentFixture<AdminPromoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPromoteComponent]
    });
    fixture = TestBed.createComponent(AdminPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
