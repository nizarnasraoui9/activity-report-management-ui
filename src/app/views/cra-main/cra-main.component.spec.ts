import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraMainComponent } from './cra-main.component';

describe('CraMainComponent', () => {
  let component: CraMainComponent;
  let fixture: ComponentFixture<CraMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CraMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
