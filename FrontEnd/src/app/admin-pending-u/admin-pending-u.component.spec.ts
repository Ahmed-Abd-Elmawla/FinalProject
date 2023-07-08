import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingUComponent } from './admin-pending-u.component';

describe('AdminPendingUComponent', () => {
  let component: AdminPendingUComponent;
  let fixture: ComponentFixture<AdminPendingUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPendingUComponent]
    });
    fixture = TestBed.createComponent(AdminPendingUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
