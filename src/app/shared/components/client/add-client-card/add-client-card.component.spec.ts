import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientCardComponent } from './add-client-card.component';

describe('AddClientCardComponent', () => {
  let component: AddClientCardComponent;
  let fixture: ComponentFixture<AddClientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
