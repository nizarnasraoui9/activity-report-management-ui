import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInCraComponent } from './view-in-cra.component';

describe('ViewInCraComponent', () => {
  let component: ViewInCraComponent;
  let fixture: ComponentFixture<ViewInCraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInCraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInCraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
