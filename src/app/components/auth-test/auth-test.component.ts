import { Component, OnInit, signal, Signal } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-test',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    FieldsetModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth-test.component.html',
  styleUrl: './auth-test.component.scss',
})
export class AuthTestComponent implements OnInit {
  public signInForm!: FormGroup;

  public signUpForm!: FormGroup;

  public isLogged: Signal<boolean> = signal(false);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: [''],
    });
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: [''],
    });
    this.isLogged = this.authService.isAuthenticated;
  }

  onSignIn(): void {
    const { email, password } = this.signInForm.value;
    this.authService.signIn(email, password);
  }

  onSignUp(): void {
    const { email, password } = this.signUpForm.value;
    this.authService.signUp(email, password);
  }

  logOut(): void {
    this.authService.logout();
  }
}
