import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingSchemeComponent } from './seating-scheme.component';

describe('SeatingSchemeComponent', () => {
  let component: SeatingSchemeComponent;
  let fixture: ComponentFixture<SeatingSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatingSchemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeatingSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
