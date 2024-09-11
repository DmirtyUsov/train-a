import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { Store } from '@ngrx/store';
import { AuthActions, AuthSelectors } from '../../../store';
import { BackendService } from '../../../services/backend.service';
import { ToastService } from '../../../services/toast.service';
import { ResponseError } from '../../../models/error.model';

@Component({
  selector: 'app-user-info-block',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    CardModule,
    DividerModule,
    DialogModule,
  ],
  templateUrl: './user-info-block.component.html',
  styleUrl: './user-info-block.component.scss',
})
export class UserInfoBlockComponent implements OnInit, OnDestroy {
  public newName: string = '';

  public newEmail: string = '';

  public newPassword: string = '';

  private destroy$ = new Subject();

  isEditingName = false;

  isEditingEmail = false;

  passwordDialogVisible: boolean = false;

  constructor(
    private store: Store,
    private backend: BackendService,
    private toast: ToastService,
  ) {}

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

  updatePassword() {
    this.backend
      .updatePassword(this.newPassword)
      .pipe(
        tap(() => this.toast.success('Successful update!')),
        catchError((error) => {
          this.toast.error((error as ResponseError).message);
          return throwError(() => new Error(error));
        }),
      )
      .subscribe(() => {
        this.passwordDialogVisible = false;
      });
  }

  logout() {
    this.store.dispatch(AuthActions.signOut());
  }

  showDialog() {
    this.passwordDialogVisible = true;
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
