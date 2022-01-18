import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire';
import { SharedModule } from '../shared/shared.module';
import { FirebaseConfigService } from './auth/firebase-config.service';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfigService } from './config/config.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

function getFirebaseConfig(firebaseConfig: FirebaseConfigService) {
  return firebaseConfig.get();
}

const firebaseOptions: Provider = {
  provide: FIREBASE_OPTIONS,
  useFactory: getFirebaseConfig,
  deps: [FirebaseConfigService],
};

const ConfiguredAngularFireModule: ModuleWithProviders<AngularFireModule> = {
  ngModule: AngularFireModule,
  providers: [firebaseOptions],
};

@NgModule({
  declarations: [ToolbarComponent, ProgressBarComponent],
  imports: [CommonModule, SharedModule],
  exports: [ToolbarComponent, ProgressBarComponent],
  providers: [
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
