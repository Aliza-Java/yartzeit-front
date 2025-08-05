import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), 
    provideHttpClient(), 
    importProvidersFrom(ReactiveFormsModule )
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
