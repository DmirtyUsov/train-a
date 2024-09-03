import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoBlockComponent } from './user-info-block.component';

describe('UserInfoBlockComponent', () => {
  let component: UserInfoBlockComponent;
  let fixture: ComponentFixture<UserInfoBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
