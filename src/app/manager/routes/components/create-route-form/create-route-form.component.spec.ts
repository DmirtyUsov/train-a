import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRouteFormComponent } from './create-route-form.component';

describe('CreateRouteFormComponent', () => {
  let component: CreateRouteFormComponent;
  let fixture: ComponentFixture<CreateRouteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRouteFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
