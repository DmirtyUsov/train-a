import { Component } from '@angular/core';
import { SignUpFormComponent } from '../../components/sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [SignUpFormComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {}
