import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './core/features/auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideBrowserGlobalErrorListeners(), 
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()),
    // provideClientHydration(withEventReplay()),
    {provide: HTTP_INTERCEPTORS, useClass  : AuthInterceptor, multi: true},
  ],
};
