import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import * as Sentry from '@sentry/angular';
import { ChallengeModule } from 'src/challenge/challenge.module';
import { LocationsModule } from 'src/locations/locations.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { FeaturedLocationsComponent } from './containers/featured-locations/featured-locations.component';
import { ProfilePhotoDialogComponent } from './containers/profile-photo-dialog/profile-photo-dialog.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    ProfilePhotoDialogComponent,
    FeaturedLocationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    StoreModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    LocationsModule,
    ChallengeModule,
    UsersModule,
  ],
  entryComponents: [
    SplashScreenComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    { provide: 'googleTagManagerId', useValue: 'GTM-W79HP9V' },
  ]
})
export class AppModule { }
