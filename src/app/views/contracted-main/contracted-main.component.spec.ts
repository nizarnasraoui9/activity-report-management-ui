import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractedMainComponent } from './contracted-main.component';

describe('ContractedMainComponent', () => {
  let component: ContractedMainComponent;
  let fixture: ComponentFixture<ContractedMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractedMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractedMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
