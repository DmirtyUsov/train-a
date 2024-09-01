import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageInfoListComponent } from './carriage-info-list.component';

describe('CarriageInfoListComponent', () => {
  let component: CarriageInfoListComponent;
  let fixture: ComponentFixture<CarriageInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageInfoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriageInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
