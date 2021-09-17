import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractedCardComponent } from './contracted-card.component';

describe('ContractedCardComponent', () => {
  let component: ContractedCardComponent;
  let fixture: ComponentFixture<ContractedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
