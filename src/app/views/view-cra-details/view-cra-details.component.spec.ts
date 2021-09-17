import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCraDetailsComponent } from './view-cra-details.component';

describe('ViewCraDetailsComponent', () => {
  let component: ViewCraDetailsComponent;
  let fixture: ComponentFixture<ViewCraDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCraDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
