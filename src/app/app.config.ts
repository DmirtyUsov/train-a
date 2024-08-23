import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { appStoreProviders } from './app.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    ...appStoreProviders,
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    MessageService,
  ],
};
