import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthActions, AuthSelectors } from '../../store';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    FieldsetModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent implements OnInit {
  public signUpForm!: FormGroup;

  public isSubmitted: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[\w\d_]+@[\w\d_]+.\w{2,7}$/),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', Validators.required],
      },
      { validators: this.matchPasswordValidator },
    );
  }

  private signUpError$ = this.store.select(AuthSelectors.selectError);

  public errorSignal = toSignal(this.signUpError$);

  public isLoading$ = this.store.select(AuthSelectors.selectIsLoading);

  onSignUp(): void {
    const { email, password } = this.signUpForm.value;
    this.isSubmitted = true;
    this.signUpForm.markAsPristine();
    this.store.dispatch(AuthActions.signUp({ email, password }));
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get repeatPassword() {
    return this.signUpForm.get('repeatPassword');
  }

  // eslint-disable-next-line class-methods-use-this
  private matchPasswordValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (password && repeatPassword?.value !== password.value) {
      return { mismatch: true };
    }

    return null;
  }
}
