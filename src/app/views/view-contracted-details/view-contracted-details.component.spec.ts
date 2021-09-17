import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContractedDetailsComponent } from './view-contracted-details.component';

describe('ViewContractedDetailsComponent', () => {
  let component: ViewContractedDetailsComponent;
  let fixture: ComponentFixture<ViewContractedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewContractedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContractedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
