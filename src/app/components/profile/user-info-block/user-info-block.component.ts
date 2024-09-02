import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Store } from '@ngrx/store';
import { AuthActions, AuthSelectors } from '../../../store';

@Component({
  selector: 'app-user-info-block',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FormsModule,
    CardModule,
    DividerModule,
  ],
  templateUrl: './user-info-block.component.html',
  styleUrl: './user-info-block.component.scss',
})
export class UserInfoBlockComponent implements OnInit, OnDestroy {
  public newName: string = '';

  public newEmail: string = '';

  private destroy$ = new Subject();

  isEditingName = false;

  isEditingEmail = false;

  constructor(private store: Store) {}

  user$ = this.store.select(AuthSelectors.selectProfile);

  isLoading$ = this.store.select(AuthSelectors.selectIsLoading);

  isManager$ = this.store.select(AuthSelectors.selectIsManager);

  ngOnInit() {
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.newName = user?.name ?? '';
      this.newEmail = user?.email ?? '';
    });
  }

  editName() {
    this.isEditingName = true;
  }

  editEmail() {
    this.isEditingEmail = true;
  }

  saveName() {
    this.store.dispatch(
      AuthActions.updateUserProfile({
        profile: { email: this.newEmail, name: this.newName },
      }),
    );
    this.isEditingName = false;
  }

  saveEmail() {
    this.store.dispatch(
      AuthActions.updateUserProfile({
        profile: { email: this.newEmail, name: this.newName },
      }),
    );
    this.isEditingEmail = false;
  }

  logout() {
    this.store.dispatch(AuthActions.signOut());
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
