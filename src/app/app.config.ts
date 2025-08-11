import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations()]  // if you see provideNoopAnimations, change to provideAnimations()
};
