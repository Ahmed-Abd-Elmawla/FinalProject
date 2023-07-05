import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingComponent } from './admin-pending.component';

describe('AdminPendingComponent', () => {
  let component: AdminPendingComponent;
  let fixture: ComponentFixture<AdminPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPendingComponent]
    });
    fixture = TestBed.createComponent(AdminPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
