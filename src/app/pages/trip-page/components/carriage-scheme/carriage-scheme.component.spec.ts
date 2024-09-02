import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageSchemeComponent } from './carriage-scheme.component';

describe('CarriageSchemeComponent', () => {
  let component: CarriageSchemeComponent;
  let fixture: ComponentFixture<CarriageSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageSchemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriageSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
