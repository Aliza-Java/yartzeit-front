/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { spinnerInterceptorFn } from './app/spinner.interceptor';

bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
        ...appConfig.providers,
        provideHttpClient(withInterceptors([spinnerInterceptorFn])),
        importProvidersFrom(ReactiveFormsModule),
        provideRouter(routes),
        provideAnimations(),           // global animations
        importProvidersFrom(NgxSpinnerModule)
    ]
}).catch(err => console.error(err));