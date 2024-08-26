import { Component } from '@angular/core';
import { SignInFormComponent } from '../../components/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [SignInFormComponent],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent {}
