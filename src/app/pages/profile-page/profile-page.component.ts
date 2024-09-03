import { Component } from '@angular/core';
import { UserInfoBlockComponent } from '../../components/profile/user-info-block/user-info-block.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [UserInfoBlockComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {}
