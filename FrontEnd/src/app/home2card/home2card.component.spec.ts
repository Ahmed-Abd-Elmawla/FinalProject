import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home2cardComponent } from './home2card.component';

describe('Home2cardComponent', () => {
  let component: Home2cardComponent;
  let fixture: ComponentFixture<Home2cardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Home2cardComponent]
    });
    fixture = TestBed.createComponent(Home2cardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
