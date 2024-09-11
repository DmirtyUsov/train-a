import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageLegendComponent } from './carriage-legend.component';

describe('CarriageLegendComponent', () => {
  let component: CarriageLegendComponent;
  let fixture: ComponentFixture<CarriageLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageLegendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriageLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
