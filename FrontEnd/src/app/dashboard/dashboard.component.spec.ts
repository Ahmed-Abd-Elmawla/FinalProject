import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordComponent } from './dashboard.component';

describe('DashbordComponent', () => {
  let component: DashbordComponent;
  let fixture: ComponentFixture<DashbordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordComponent]
    });
    fixture = TestBed.createComponent(DashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
