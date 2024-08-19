import { bootstrapApplication } from '@angular/platform-browser';
import { startServer } from '@planess/train-a-backend';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

startServer();
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  // eslint-disable-next-line no-console
  console.error(err),
);
