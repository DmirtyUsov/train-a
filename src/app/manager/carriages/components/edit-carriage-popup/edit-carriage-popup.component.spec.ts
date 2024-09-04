import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarriagePopupComponent } from './edit-carriage-popup.component';

describe('EditCarriagePopupComponent', () => {
  let component: EditCarriagePopupComponent;
  let fixture: ComponentFixture<EditCarriagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCarriagePopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCarriagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
