import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCraButtonComponent } from './add-cra-button.component';

describe('AddCraButtonComponent', () => {
  let component: AddCraButtonComponent;
  let fixture: ComponentFixture<AddCraButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCraButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCraButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
