import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractedModalComponent } from './add-contracted-modal.component';

describe('AddContractedModalComponent', () => {
  let component: AddContractedModalComponent;
  let fixture: ComponentFixture<AddContractedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContractedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContractedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
