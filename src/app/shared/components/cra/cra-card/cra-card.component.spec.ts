import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraCardComponent } from './cra-card.component';

describe('CraCardComponent', () => {
  let component: CraCardComponent;
  let fixture: ComponentFixture<CraCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CraCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
