import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractedCardComponent } from './add-contracted-card.component';

describe('AddContractedCardComponent', () => {
  let component: AddContractedCardComponent;
  let fixture: ComponentFixture<AddContractedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContractedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContractedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
