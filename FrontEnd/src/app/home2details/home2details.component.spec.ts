import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home2detailsComponent } from './home2details.component';

describe('Home2detailsComponent', () => {
  let component: Home2detailsComponent;
  let fixture: ComponentFixture<Home2detailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Home2detailsComponent]
    });
    fixture = TestBed.createComponent(Home2detailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
