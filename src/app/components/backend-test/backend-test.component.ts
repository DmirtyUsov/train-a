import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-backend-test',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    FieldsetModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './backend-test.component.html',
  styleUrl: './backend-test.component.scss',
})
export class BackendTestComponent {
  constructor(private backendService: BackendService) {}

  onGet(endpoint: string) {
    this.backendService.logGETResponse(endpoint);
  }
}
