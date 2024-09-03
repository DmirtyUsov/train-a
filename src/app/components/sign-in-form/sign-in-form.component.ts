import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthActions, AuthSelectors } from '../../store';

@Component({
  selector: 'app-sign-in-form',
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
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInFormComponent implements OnInit {
  public signInForm!: FormGroup;

  public isSubmitted: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w\d_]+@[\w\d_]+.\w{2,7}$/),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  private signInError$ = this.store.select(AuthSelectors.selectError);

  public errorSignal = toSignal(this.signInError$);

  public isLoading$ = this.store.select(AuthSelectors.selectIsLoading);

  onSignIn(): void {
    const { email, password } = this.signInForm.value;
    this.isSubmitted = true;
    this.signInForm.markAsPristine();
    this.store.dispatch(AuthActions.signIn({ email, password }));
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
